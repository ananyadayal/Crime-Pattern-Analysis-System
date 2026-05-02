const express = require('express');
const router = express.Router();

// GET all crimes
router.get('/', (req, res) => {
  const db = req.app.locals.db;
  const query = `
    SELECT c.CrimeID, c.CrimeType, c.CrimeDate, c.CrimeTime, c.Severity, c.Status,
           l.AreaName, l.City, o.OfficerName, s.SuspectName
    FROM Crime c
    LEFT JOIN Location l ON c.LocationID = l.LocationID
    LEFT JOIN Officer o ON c.OfficerID = o.OfficerID
    LEFT JOIN Suspect s ON c.SuspectID = s.SuspectID
    ORDER BY c.CrimeDate DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST - add a new crime
router.post('/', (req, res) => {
  const db = req.app.locals.db;
  const { CrimeType, CrimeDate, CrimeTime, Severity, Status, LocationID, StationID, SuspectID, OfficerID } = req.body;
  const query = `INSERT INTO Crime (CrimeType, CrimeDate, CrimeTime, Severity, Status, LocationID, StationID, SuspectID, OfficerID)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [CrimeType, CrimeDate, CrimeTime, Severity, Status || 'Open', LocationID, StationID, SuspectID, OfficerID], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Crime added!', id: result.insertId });
  });
});

// PUT - update crime status
router.put('/:id', (req, res) => {
  const db = req.app.locals.db;
  const { Status } = req.body;
  db.query('UPDATE Crime SET Status = ? WHERE CrimeID = ?', [Status, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Status updated!' });
  });
});

// DELETE a crime
router.delete('/:id', (req, res) => {
  const db = req.app.locals.db;
  db.query('DELETE FROM Crime WHERE CrimeID = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Crime deleted.' });
  });
});

module.exports = router;
