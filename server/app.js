const express = require("express");
const fs = require("fs");
const https = require("https");
const log4js = require("log4js");
const app = express();

const options = {
  ca: fs.readFileSync("./chain.pem"),
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./cert.pem")
}
const server = https.createServer(options, app);

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});
const mysql = require('mysql');
const { send } = require("process");
const config = require("./config.json");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

log4js.configure({
  appenders: { error_log: { type: 'file', filename: `logs/${Date.now()}.log`}},
  categories: { default: { appenders: ['error_log'], level: 'error'}}
});

var logger = log4js.getLogger('error_log');

app.use(index);


const getApiAndEmit = "TODO";

const SQLconnection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.password,
  database: config.database
});

var manipulationSockets = [];
var dashboardSockets = [];
var settingsSockets = [];
var productivitySockets = [];
var houseStatSockets = [];
var batterySockets = [];
var estatusSockets = [];
var companySockets = [];
var senderSockets = [];
var raspiSockets = [];

try{
  io.on("connection", (socket) => {
    console.log("New client connected");
  
    // Jeweilige Client-Art abfragen und in Kategorien speichern

    // Passwort-Abfrage
    socket.on("password", () => {
      SQLconnection.query("SELECT * FROM password WHERE id=1", (err, rows) => {
        socket.emit("password", rows[0].password);
      });
    });
  
    /**
     * Manipulation Connection
     */
  
    socket.on("manipulation", () => {
      manipulationSockets.push(socket);
      startManipulationSocket(socket);
  
      socket.on("disconnect", () => {
        console.log("Manipulation disconnected");
  
        const index = manipulationSockets.indexOf(socket);
        if (index > -1) {
          manipulationSockets.splice(index, 1);
        }
      });
    });
  
    /**
     * Raspberry Pi Connection
     */
  
    socket.on("raspberry", () => {
      manipulationSockets.push(socket);
      raspiSockets.push(socket);

      startManipulationSocket(socket);
      sendHouses(socket);
  
      socket.on("storageChange", (data) => {
        const value = data.value;

        getTime(hour => {
          SQLconnection.query(`UPDATE battery SET capacity = (${value}) WHERE hour=${hour}`, (err) => {if (err) throw err;
            dashboardSockets.forEach(function(dashboardSocket){
              sendStorage(dashboardSocket);
            });
            batterySockets.forEach(function(batterySocket){
              sendStorage(batterySocket);
            });
          });
        });
      });

      socket.on("time", (time) => {
        SQLconnection.query(`UPDATE dashboard SET time = ${time} WHERE id=1`, (err) => {if (err) throw err;});
        SQLconnection.query("SELECT * FROM sliders", (err, rows) => {
          if (err) throw err;
          let data = rows[0]
          
          SQLconnection.query(`UPDATE vb_hour SET vb=(${data.housevb}) WHERE hour=${time}`, err => {
            if (err) throw err;


            SQLconnection.query(`UPDATE wind_produktion SET produktion=(${data.wind}) WHERE hour=${time}`, err => {
              if (err) throw err;
  
              SQLconnection.query(`UPDATE sonne_produktion SET produktion=(${data.sun}) WHERE hour=${time}`, err => {
                if (err) throw err;
                dashboardSockets.forEach(function(dashboardSocket){
                  sendSun(dashboardSocket);
                  sendVB(dashboardSocket)
                });
                companySockets.forEach(function(companySocket){
                  sendWindSun(companySocket);
                });
                houseStatSockets.forEach(function(houseStatSocket){
                  sendHouseStat(houseStatSocket);
                });
              });
            });
          });          
        });
      });

      socket.on("estatusChange", (data) => {
        getTime(hour => {
          SQLconnection.query(`UPDATE estatus_hour SET value = (${data}) WHERE hour=${hour}`, err => {
            if (err) throw err;
            estatusSockets.forEach(function(ESsocket){
              sendEStatus(ESsocket);
            });
          })
        })
      });

      socket.on("hlChange", data => {
        SQLconnection.query(`UPDATE hauptleitung SET annahme=(${data.annahme}), abgabe=(${data.abgabe}) WHERE id=1`, err =>{
          if (err) throw err;
          estatusSockets.forEach(function(ESsocket){
            sendHLStats(ESsocket);
          });
        });
      });

      socket.on("companyChange", data => {
        getTime(hour => {
          SQLconnection.query(`UPDATE firma_produktivität SET produktivität = (${data}) WHERE hour=${hour}`, err => {
            if (err) throw err;
            estatusSockets.forEach(function(ESsocket){
              sendEStatus(ESsocket);
            });
          });
        });
      });
  
      socket.on("disconnect", () => {
        console.log("Raspberry Pi disconnected");
  
        let index = manipulationSockets.indexOf(socket);
        if (index > -1) {
          manipulationSockets.splice(index, 1);
        }
        index = raspiSockets.indexOf(socket);
        if (index > -1) {
          raspiSockets.splice(index, 1);
        }
  
      });
    });
  
    /**
     * HouseSTAT Connection
    */
  
    socket.on("housestat", () => {
      houseStatSockets.push(socket);
      sendHouseStat(socket);
  
      socket.on("disconnect", () => {
        console.log("HouseStat disconnected");
  
        const index = houseStatSockets.indexOf(socket);
        if (index > -1) {
          houseStatSockets.splice(index, 1);
        }
      });
    });
  
    /**
     * Dashboard Connection
    */
  
    socket.on("dashboard", () =>{
      dashboardSockets.push(socket);
      sendStorage(socket);
      sendSun(socket);
      sendVB(socket);
  
      socket.on("disconnect", () => {
        const index = dashboardSockets.indexOf(socket);
        if (index > -1) {
          dashboardSockets.splice(index, 1);
        }
        console.log("Dashboard disconnected");
  
      });
    });
  
    /**
     * Battery Connection
    */
  
    socket.on("battery", () =>{
    batterySockets.push(socket);
    senderSockets.push(socket);
    sendStorage(socket);
    sendSenders(socket);
  
      socket.on("disconnect", () => {
        let index = batterySockets.indexOf(socket);
        if (index > -1) {
          batterySockets.splice(index, 1);
        }
        index = senderSockets.indexOf(socket);
        if (index > -1) {
          senderSockets.splice(index, 1);
        }
        console.log("Battery disconnected");
  
      });
    });
  
    /**
     * E-Status Connection
    */
  
   socket.on("estatus", () =>{
    estatusSockets.push(socket);
    sendEStatus(socket);
    sendHLStats(socket);
    sendCar(Math.floor(Math.random() * 15) + 1, socket);

    socket.on("startChange", (data) => {
      SQLconnection.query(`UPDATE cars SET start="${data.start}" WHERE id=${data.id}`, (err) => {
        if (err) throw err;
      });
    });

    socket.on("endChange", (data) => {
      SQLconnection.query(`UPDATE cars SET end="${data.end}" WHERE id=${data.id}`, (err) => {
        if (err) throw err;
      });
    });
  
    socket.on("disconnect", () => {
      let index = estatusSockets.indexOf(socket);
      if (index > -1) {
        estatusSockets.splice(index, 1);
      }
      console.log("E-Status disconnected");

    });
    });
  
    /**
     * Settings Connection
    */
  
    socket.on("settings", () => {
      settingsSockets.push(socket);
      sendHouses(socket);
  
      socket.on("houseChange", (data) => {
        SQLconnection.query(`UPDATE houses SET house = ${data.house} WHERE id=${data.id}`, (err) => {if (err) throw err;});
        
        settingsSockets.forEach(function(settingsSocket){
          if(settingsSocket != socket){
            sendHouses(settingsSocket);
          }
        });
        raspiSockets.forEach(function(raspiSocket){
          sendHouses(raspiSocket);
        })
      });
  
      socket.on("disconnect", () => {
      const index = dashboardSockets.indexOf(socket);
      if (index > -1) {
        manipulationSockets.splice(index, 1);
      }
      console.log("Settings disconnected!");
      });
    });
  
    /**
     * Company Connection
    */
  
   socket.on("company", () => {
    companySockets.push(socket);
    sendWindSun(socket);
  
    socket.on("disconnect", () => {
      const index = companySockets.indexOf(socket);
      if (index > -1) {
        companySockets.splice(index, 1);
      }
      console.log("Company disconnected!");
    });
  });
  
    /**
     * Productivity Connection
    */
  
    socket.on("produktivitaet", () => {
      productivitySockets.push(socket);
      sendProductivity(socket);
  
      socket.on("disconnect", () => {
        const index = productivitySockets.indexOf(socket);
        if (index > -1) {
          productivitySockets.splice(index, 1);
        }
        console.log("Productivity disconnected!");
      });
    });
  });
  
  SQLconnection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });
  
  /**
   * 
   * FUNCTIONS
   * 
   */
  
  function startManipulationSocket(socket){
    // Am Anfang die Werte senden
    sendSliders(socket);
  
    // Wenn Sliderwerte in der DB geänder werden sollen
    socket.on("rangeChange", (data) =>{
      const param = data.param;
      const value = data.value;
  
      SQLconnection.query(`UPDATE sliders SET ${param} = ${value} WHERE id=1`, (err) => {if (err) throw err;});
  
      manipulationSockets.forEach(function(manipulationSocket){
        // Jedem anderen "sliders"-Client aktuelle Werte schicken
        if(manipulationSocket != socket){
          sendSliders(manipulationSocket);
        }
      });
    });
  }
  
  // Sende Sliderdaten an den jeweiligen Socket
  function sendSliders(socket){
    SQLconnection.query("SELECT * FROM sliders", (err, rows) => {
      if (err) throw err;
      socket.emit("FromAPI", {housevb: rows[0].housevb, companyvb: rows[0].companyvb, sun: rows[0].sun, wind: rows[0].wind, ekarma: rows[0].ekarma});
    });
  }
  
  // Sende Speicherlist an den jeweiligen Socket
  function sendStorage(socket){
    SQLconnection.query("SELECT * FROM battery", (err, rows) => {
      if (err) throw err;
      let batteryDict = {};
      for(let row of rows){
        batteryDict[row.hour] = row.capacity;
      }

      sortValues(batteryDict, (sortedList) => {
        socket.emit("battery", sortedList);
      });
    });

    
  }
  
  // Sende private Stromproduktion (Sonne) an den jeweiligen Socket
  function sendSun(socket){
    SQLconnection.query("SELECT * FROM sonne_produktion", (err, rows) => {
      if (err) throw err;
      let sunDict = {};
      for(let row of rows){
        sunDict[row.hour] = row.produktion;
      }

      sortValues(sunDict, (sortedList) => {
        socket.emit("sun", sortedList);
      });
    });
  }
  
  // Sende privaten Verbrauch an den jeweiligen Socket
  function sendVB(socket){
    SQLconnection.query("SELECT * FROM vb_hour", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let vbDict = {};
      for(let row of rows){
        vbDict[row.hour] = row.vb;
      }

      sortValues(vbDict, (sortedList) => {
        socket.emit("vb", sortedList);
      });
    });
  }

  function sendCar(id, socket){
    SQLconnection.query(`SELECT * FROM cars WHERE id=${id}`, (err, rows) => {
      if (err) throw err;
      socket.emit("cars", rows[0]);
    });
  }
  
  // Sende Grundstücksituation an den jeweiligen Socket
  function sendHouses(socket){
    SQLconnection.query("SELECT * FROM houses", (err, rows) => {
      if (err) throw err;
      socket.emit("houses", rows);
    });
  }
  
  // Sende Firmaproduktionsadaten (daily) an den jeweiligen Socket
  function sendProductivity(socket){
    SQLconnection.query("SELECT * FROM firma_produktivität", (err, rows) => {
      if (err) throw err;
      let entriesDict = {};
      for(let row of rows){
        entriesDict[row.hour] = row.produktivität;
      }
      
      sortValues(entriesDict, (sortedList) => {
        socket.emit("produktivitaet", sortedList);
      });
    });
  }
  
  // Sende Energiestatus an den jeweiligen Socket
  function sendEStatus(socket){
    SQLconnection.query("SELECT * FROM estatus_hour", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let entriesDict = {};
      for(let row of rows){
        entriesDict[row.hour] = row.value;
      }

      sortValues(entriesDict, (sortedList) => {
        socket.emit("estatus", sortedList);
      });
    });
  }
  
  // Sende Kombination aus Sonne und Verbrauch (Ansicht App)
  function sendHouseStat(socket){
    SQLconnection.query("SELECT * FROM vb_hour", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let vbDict = {};
      for(let row of rows){
        vbDict[row.hour] = row.vb;
      }

      sortValues(vbDict, (vb) => {
        SQLconnection.query("SELECT * FROM sonne_produktion", (err, rows) => {
          if (err) throw err;
          let sunDict = {};
          for(let row of rows){
            sunDict[row.hour] = row.produktion;
          }

          sortValues(sunDict, (sun) => {
            socket.emit("FromAPI", {sun: sun, vb: vb});
          });  
        });
      });
  
    });
  }
  
  // Sende Kombination aus Sonne und Verbrauch (Ansicht App)
  function sendWindSun(socket){
    SQLconnection.query("SELECT * FROM wind_produktion", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let windDict = {};
      for(let row of rows){
        windDict[row.hour] = row.produktion;
      }
      sortValues(windDict, (wind) => {      
        SQLconnection.query("SELECT * FROM sonne_produktion", (err, rows) => {
          if (err) throw err;
          let sunDict = {};
          for(let row of rows){
            sunDict[row.hour] = row.produktion;
          }
          sortValues(sunDict, (sun) => {
            socket.emit("windsun", {sun: sun, wind: wind});
          });
        });
      });
  
    });
  }

  // Sende Sender für den Energiespeicher
  function sendSenders(socket){
    SQLconnection.query("SELECT * FROM senders", (err, rows) => {
      if (err) throw err;

      let sendersDict = {};
      for (let row of rows){
        sendersDict[row.slot] = {abgabe: row.abgabe, annahme: row.annahme};
      }

      socket.emit("sender", sendersDict);
    });
  }

  // Sende Statistike der Hauptleitung
  function sendHLStats(socket){
    SQLconnection.query("SELECT * FROM hauptleitung WHERE id=1", (err, rows) => {
      if (err) throw err;
      socket.emit("hl", {abgabe: rows[0].abgabe, annahme: rows[0].annahme});
    });
  }

  /**
   * 
   * Util Functions 
   * 
   */
  function sortValues(data, callback){
    SQLconnection.query("SELECT * FROM dashboard WHERE id=1", (err, rows) => {
      if (err) throw err;
      let time = rows[0].time;

      let output = [];
      for (let i = time+1; i < 24; i++){
        output.push({hour: i, value: data[i]});
      }
      for(let i = 0; i <= time; i++){
        output.push({hour: i, value: data[i]});
      }
      callback(output);
    });
  }

  function getTime(callback){
    SQLconnection.query("SELECT * FROM dashboard WHERE id=1", (err, rows) => {
      let hour = rows[0].time;
      callback(hour);
    });
  }
  
  server.listen(port, () => console.log(`Listening on Port ${port}`));

} catch(error){
  logger.error(error);
}


