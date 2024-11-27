const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '***REMOVED***',
    database: 'school_management'
});

module.exports = pool;
