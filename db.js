// const mysql = require("mysql");

// const db = mysql.createConnection({
//     host: 'localhost',
//     user:'root',
//     password:"Shubham@007#",
//     database :'blog'
// });

// module.exports = db;

const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'Shubham@007#',
    database: 'blog'
});

module.exports = db;