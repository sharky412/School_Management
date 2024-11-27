const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '$Hardul412',
    database: 'school_management'
});

module.exports = pool;
