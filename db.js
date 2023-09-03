const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:"Shubham@007#",
    database :'blog'
});

module.exports = db;