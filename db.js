const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'db4free.net',
    user:'rootusershubh',
    password:"Shubham@007#",
    database :'blogappnew'
});

module.exports = db;