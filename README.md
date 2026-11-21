# School Management API

A REST API for adding schools and listing them sorted by distance from a given location. Built with **Node.js**, **Express** and **MySQL**, with distances calculated by `geolib`.

[![Live demo](https://img.shields.io/badge/Live_demo-Vercel-000000?logo=vercel&logoColor=white)](https://school-management-one-orcin.vercel.app)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- **Add a school** with name, address, latitude and longitude (all fields required).
- **List schools by proximity**: pass your latitude/longitude and get every school with its distance (in metres), sorted nearest first.
- Input validation with `400` responses for missing fields.
- Ready to deploy on Vercel (`vercel.json`) or a Procfile-based host (`Procfile`).

## Tech Stack

- Node.js, Express, body-parser
- MySQL (`mysql2` driver)
- geolib for distance calculation
- dotenv for configuration

## API

### `POST /addSchool`

Request body (JSON):

```json
{
  "name": "Example School",
  "address": "123 Main Street",
  "latitude": 18.52,
  "longitude": 73.85
}
```

Response `201`:

```json
{ "message": "School added successfully", "schoolId": 1 }
```

### `GET /listSchools?latitude=<lat>&longitude=<lng>`

Response `200`:

```json
{
  "schools": [
    { "id": 1, "name": "Example School", "address": "123 Main Street", "latitude": 18.52, "longitude": 73.85, "distance": 0 }
  ]
}
```

## Getting Started

### Prerequisites

- Node.js and npm
- A MySQL server

### Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/sharky412/School_Management.git
   cd School_Management
   npm install
   ```

2. Create the database and `schools` table:

   ```bash
   mysql -u <user> -p < schools.sql
   ```

3. Configure your database connection in a `.env` file:

   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=School_Management
   PORT=3000
   ```

4. Start the server (defaults to http://localhost:3000):

   ```bash
   npm start
   ```

## Project Structure

```
School_Management/
├── app.js        # Express app with /addSchool and /listSchools
├── schools.sql   # Database and table schema
├── vercel.json   # Vercel deployment config
└── Procfile      # Process definition for Procfile-based hosts
```

## License

Released under the [MIT License](LICENSE).
