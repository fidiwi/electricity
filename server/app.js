const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
});
const mysql = require('mysql');
const config = require("./config.json");

const port = process.env.PORT || 4001;
const index = require("./routes/index");


app.use(index);


const getApiAndEmit = "TODO";

const SQLconnection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.password,
  database: config.database
});

var manipulationSockets = [];

io.on("connection", (socket) => {
    console.log("New client connected");

    // Jeweilige Client-Art abfragen und in Kategorien speichern
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

    socket.on("raspberry", () => {
      manipulationSockets.push(socket);
      startManipulationSocket(socket);

      socket.on("disconnect", () => {
        console.log("Raspberry Pi disconnected");

        const index = manipulationSockets.indexOf(socket);
        if (index > -1) {
          manipulationSockets.splice(index, 1);
        }
      });
    });

    socket.on("housevb", () => {
      SQLconnection.query("SELECT * FROM vb_hour", (err, rows) => {
        if (err) throw err;
        let entries = {};
        for(let row of rows){
          entries[row.hour] = row.vb;
        }

        // Object ausgeben nach Format {0: 0.3, ..., 23: 0.5}
        socket.emit("FromAPI", entries);
      });

      socket.on("disconnect", () => {
        console.log("HouseVB client disconnected");
      });
    });

});

SQLconnection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

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
      if(manipulationSocket !== socket){
        sendSliders(manipulationSocket);
      }
    })
  });

}

// Sende Sliderdaten an den jeweiligen Socket
function sendSliders(socket){
  SQLconnection.query("SELECT * FROM sliders", (err, rows) => {
    if (err) throw err;
    socket.emit("FromAPI", {housevb: rows[0].housevb, companyvb: rows[0].companyvb, sun: rows[0].sun, wind: rows[0].wind, ekarma: rows[0].ekarma});
  });
}

server.listen(port, () => console.log(`Listening on Port ${port}`))
