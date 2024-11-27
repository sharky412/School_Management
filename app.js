const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const geolib = require('geolib');

const app = express();
app.use(bodyParser.json());

require('dotenv').config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
});

app.get('/listSchools', (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and Longitude are required.' });
  }
  const query = 'SELECT * FROM schools';
  db.query(query, (err, schools) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    const schoolsWithDistance = schools.map((school) => {
      const distance = geolib.getDistance(
        { latitude, longitude },
        { latitude: school.latitude, longitude: school.longitude }
      );
      return { ...school, distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({ schools: schoolsWithDistance });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
