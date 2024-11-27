const pool = require('../config/db');

// Add School
exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error });
    }
};

// List Schools
exports.listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and Longitude are required' });
    }

    try {
        const [schools] = await pool.query('SELECT * FROM schools');
        const userLocation = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

        // Calculate distance using Haversine formula
        const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const toRad = (x) => (x * Math.PI) / 180;
            const R = 6371; // Earth's radius in km
            const dLat = toRad(lat2 - lat1);
            const dLng = toRad(lng2 - lng1);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                      Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };

        const sortedSchools = schools.map((school) => ({
            ...school,
            distance: calculateDistance(userLocation.lat, userLocation.lng, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error });
    }
};
