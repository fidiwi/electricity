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

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("manipulation", () => {
      SQLconnection.query("SELECT * FROM sliders", (err, rows) => {
        if (err) throw err;
        socket.emit("FromAPI", {housevb: rows[0].housevb, companyvb: rows[0].companyvb, sun: rows[0].sun, wind: rows[0].wind, ekarma: rows[0].ekarma});
      });
      socket.on("rangeChange", (data) =>{
        const param = data.param;
        const value = data.value;

        SQLconnection.query(`UPDATE slider SET ${param} = ${value} WHERE id=1`, (err) => {if (err) throw err;});
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
    });


    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

SQLconnection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

server.listen(port, () => console.log(`Listening on Port ${port}`))
