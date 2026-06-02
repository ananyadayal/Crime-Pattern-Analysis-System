const express = require('express');
const router = express.Router();

// Crime hotspots
router.get('/hotspots', (req, res) => {
  const db = req.app.locals.db;
  const query = `
    SELECT l.LocationID, l.AreaName, l.City, COUNT(c.CrimeID) AS TotalCrimes
    FROM Location l
    LEFT JOIN Crime c ON l.LocationID = c.LocationID
    GROUP BY l.LocationID, l.AreaName, l.City
    ORDER BY TotalCrimes DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Severity breakdown
router.get('/severity', (req, res) => {
  const db = req.app.locals.db;
  db.query('SELECT * FROM Severity_Summary', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Officer workload
router.get('/workload', (req, res) => {
  const db = req.app.locals.db;
  db.query('SELECT * FROM Officer_Workload', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Crime types frequency
router.get('/crime-types', (req, res) => {
  const db = req.app.locals.db;
  db.query('SELECT CrimeType, COUNT(*) AS Frequency FROM Crime GROUP BY CrimeType ORDER BY Frequency DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Risk levels per area
router.get('/risk-levels', (req, res) => {
  const db = req.app.locals.db;
  const query = `
    SELECT AreaName, GetTotalCrimesInArea(AreaName) AS CrimeCount,
           GetRiskLevel(AreaName) AS RiskLevel
    FROM Location
    ORDER BY CrimeCount DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Open cases
router.get('/open-cases', (req, res) => {
  const db = req.app.locals.db;
  db.query('SELECT * FROM Open_Cases', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Monthly trend
router.get('/monthly-trend', (req, res) => {
  const db = req.app.locals.db;
  const query = `
    SELECT DATE_FORMAT(CrimeDate, '%b %Y') AS Month,
           DATE_FORMAT(CrimeDate, '%Y-%m') AS SortKey,
           COUNT(*) AS TotalCrimes
    FROM Crime
    GROUP BY Month, SortKey
    ORDER BY SortKey ASC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;