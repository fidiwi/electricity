const express = require("express");
const http = require("http");
const log4js = require("log4js");
const app = express();
const server = http.createServer(app);

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

try{
  io.on("connection", (socket) => {
    console.log("New client connected");
  
    // Jeweilige Client-Art abfragen und in Kategorien speichern
  
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
      startManipulationSocket(socket);
  
      socket.on("storageChange", (data) => {
        const value = data.value;
  
        SQLconnection.query(`UPDATE dashboard SET storage_kwh = ${value} WHERE id=1`, (err) => {if (err) throw err;});
        dashboardSockets.forEach(function(dashboardSocket){
          sendStorage(dashboardSocket);
        });
      });
  
      socket.on("disconnect", () => {
        console.log("Raspberry Pi disconnected");
  
        const index = manipulationSockets.indexOf(socket);
        if (index > -1) {
          manipulationSockets.splice(index, 1);
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
    sendStorage(socket);
  
      socket.on("disconnect", () => {
        const index = batterySockets.indexOf(socket);
        if (index > -1) {
          batterySockets.splice(index, 1);
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
  
      socket.on("disconnect", () => {
        const index = estatusSockets.indexOf(socket);
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
        sendSliders(manipulationSocket);
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
    SQLconnection.query("SELECT * FROM dashboard WHERE id=1", (err, rows) => {
      if (err) throw err;
      let time = rows[0].time;

      SQLconnection.query("SELECT * FROM battery", (err, rows) => {
        if (err) throw err;
        let batteryDict = {};
        for(let row of rows){
          batteryDict[row.hour] = row.capacity;
        }

        let battery = [];
        for (let i = time+1; i < 24; i++){
          battery.push({hour: i, value: battery[i]});
        }
        for(let i = 0; i <= time; i++){
          battery.push({hour: i, value: battery[i]});
        }
        socket.emit("battery", battery);
      });
    });
    
  }
  
  // Sende private Stromproduktion (Sonne) an den jeweiligen Socket
  function sendSun(socket){
    SQLconnection.query("SELECT * FROM sonne_produktion", (err, rows) => {
      if (err) throw err;
      let sun = {};
      for(let row of rows){
        sun[row.hours] = row.produktion;
      }
  
      socket.emit("sun", sun);
    });
  }
  
  // Sende privaten Verbrauch an den jeweiligen Socket
  function sendVB(socket){
    SQLconnection.query("SELECT * FROM vb_hour", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let vb = {};
      for(let row of rows){
        vb[row.hour] = row.vb;
      }
  
      socket.emit("vb", vb);
    });
  }
  
  // Sende Grundstücksituation an den jeweiligen Socket
  function sendHouses(socket){
    SQLconnection.query("SELECT * FROM houses", (err, rows) => {
      if (err) throw err;
      socket.emit("FromAPI", rows);
    });
  }
  
  // Sende Firmaproduktionsadaten (daily) an den jeweiligen Socket
  function sendProductivity(socket){
    SQLconnection.query("SELECT * FROM firma_produktivität", (err, rows) => {
      if (err) throw err;
      let entries = {};
      for(let row of rows){
        entries[row.hours] = row.produktivität;
      }
      socket.emit("produktivitaet", entries);
    });
  }
  
  // Sende Energiestatus an den jeweiligen Socket
  function sendEStatus(socket){
    SQLconnection.query("SELECT * FROM estatus_hour", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let estatus = {};
      for(let row of rows){
        estatus[row.hour] = row.value;
      }
  
      socket.emit("estatus", estatus);
    });
  }
  
  // Sende Kombination aus Sonne und Verbrauch (Ansicht App)
  function sendHouseStat(socket){
    SQLconnection.query("SELECT * FROM vb_hour", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let vb = {};
      for(let row of rows){
        vb[row.hour] = row.vb;
      }
  
      SQLconnection.query("SELECT * FROM sonne_produktion", (err, rows) => {
        if (err) throw err;
        let sun = {};
        for(let row of rows){
          sun[row.hours] = row.produktion;
        }
  
        socket.emit("FromAPI", {sun: sun, vb: vb});
      });
  
    });
  }
  
  // Sende Kombination aus Sonne und Verbrauch (Ansicht App)
  function sendWindSun(socket){
    SQLconnection.query("SELECT * FROM wind_produktion", (err, rows) => {
      if (err) throw err;
      
      // Object erstellen nach Format {0: 0.3, ..., 23: 0.5}
      let wind = {};
      for(let row of rows){
        wind[row.hour] = row.produktion;
      }
  
      SQLconnection.query("SELECT * FROM sonne_produktion", (err, rows) => {
        if (err) throw err;
        let sun = {};
        for(let row of rows){
          sun[row.hours] = row.produktion;
        }
  
        socket.emit("windsun", {sun: sun, wind: wind});
      });
  
    });
  }
  
  server.listen(port, () => console.log(`Listening on Port ${port}`));

} catch(error){
  logger.error(error);
}


