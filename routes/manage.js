const express = require('express');
const router = express.Router();

// GET all locations
router.get('/locations', (req, res) => {
  const db = req.app.locals.db;
  db.query('SELECT * FROM Location ORDER BY City, AreaName', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new location
router.post('/locations', (req, res) => {
  const db = req.app.locals.db;
  const { AreaName, Zone, City } = req.body;
  if (!AreaName || !Zone || !City) return res.status(400).json({ error: 'All fields required' });
  db.query('INSERT INTO Location (AreaName, Zone, City) VALUES (?, ?, ?)', [AreaName, Zone, City], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Location added!', id: result.insertId });
  });
});

// GET all officers
router.get('/officers', (req, res) => {
  const db = req.app.locals.db;
  const query = `
    SELECT o.*, ps.StationName 
    FROM Officer o
    LEFT JOIN PoliceStation ps ON o.StationID = ps.StationID
    ORDER BY o.OfficerName
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new officer
router.post('/officers', (req, res) => {
  const db = req.app.locals.db;
  const { OfficerName, OfficerRank, PhoneNumber, StationID } = req.body;
  if (!OfficerName || !OfficerRank || !PhoneNumber) return res.status(400).json({ error: 'All fields required' });
  db.query('INSERT INTO Officer (OfficerName, OfficerRank, PhoneNumber, StationID) VALUES (?, ?, ?, ?)',
    [OfficerName, OfficerRank, PhoneNumber, StationID || null], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Officer added!', id: result.insertId });
  });
});

// GET all police stations
router.get('/stations', (req, res) => {
  const db = req.app.locals.db;
  db.query('SELECT * FROM PoliceStation ORDER BY StationName', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new police station
router.post('/stations', (req, res) => {
  const db = req.app.locals.db;
  const { StationName, Address, ContactNumber } = req.body;
  if (!StationName || !Address || !ContactNumber) return res.status(400).json({ error: 'All fields required' });
  db.query('INSERT INTO PoliceStation (StationName, Address, ContactNumber) VALUES (?, ?, ?)',
    [StationName, Address, ContactNumber], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Station added!', id: result.insertId });
  });
});

module.exports = router;