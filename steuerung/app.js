const mysql = require('mysql');
const config = require("./config.json");
const connection = mysql.createConnection({
  host: 'localhost',
  user: config.user,
  password: config.password,
  database: config.database
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});
