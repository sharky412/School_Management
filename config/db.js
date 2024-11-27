require('dotenv').config();  // Load environment variables from .env file

const mysql = require('mysql2/promise');

// Create MySQL connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,  // MySQL host from environment variable
  user: process.env.MYSQLUSER,  // MySQL user from environment variable
  password: process.env.MYSQLPASSWORD,  // MySQL password from environment variable
  database: process.env.MYSQLDATABASE  // MySQL database from environment variable
});

module.exports = pool;
