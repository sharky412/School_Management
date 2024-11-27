const pool = require('./config/db'); // Ensure this is the correct path to your db.js

console.log('MYSQLUSER:', process.env.MYSQLUSER);
console.log('MYSQLPASSWORD:', process.env.MYSQLPASSWORD);
console.log('MYSQLHOST:', process.env.MYSQLHOST);
console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE);
async function testDbConnection() {
  try {
    const [rows, fields] = await pool.query('SELECT 1');
    console.log('Successfully connected to the database!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

testDbConnection();
