// src/config/database.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

//Simple connection Sqlite
const sql = require('sqlite3')
const db = new sql.Database('./uni_rating.db', (err)=>{
    if(err)
        {
            console.error(err)
        }
        else{
            console.log("Connection successful")
        }
})

module.exports = db