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

//const io = socketIo.connect(server); // < Interesting!

const getApiAndEmit = "TODO";

const connection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.password,
  database: config.database
});

io.on("connection", (socket) => {
    console.log("New client connected");
    connection.query("SELECT * FROM sliders", (err, rows) => {
        if (err) throw err;
        socket.emit("FromAPI", {housevb: rows[0].housevb, companyvb: rows[0].companyvb, sun: rows[0].sun, wind: rows[0].wind, ekarma: rows[0].ekarma});
    })
    io.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

server.listen(port, () => console.log(`Listening on Port ${port}`))
