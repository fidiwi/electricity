const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require('mysql');
const config = require("./config.json");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server); // < Interesting!

const getApiAndEmit = "TODO";

const connection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.password,
  database: config.database
});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("FromAPI", "lol");
    io.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

server.listen(port, () => console.log(`Listening on Port ${port}`))
