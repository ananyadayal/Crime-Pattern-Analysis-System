const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
db.query('SELECT 1', (err) => {
  if (err) {
    console.log('Database connection failed:', err.message);
  } else {
    console.log('Connected to CrimeAnalytics database!');
  }
});

// Make db available to routes
app.locals.db = db;

// Routes
const crimesRouter = require('./routes/crimes');
const analyticsRouter = require('./routes/analytics');
const officersRouter = require('./routes/officers');

app.use('/api/crimes', crimesRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/officers', officersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));