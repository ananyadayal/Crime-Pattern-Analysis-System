const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const db = req.app.locals.db;
  const query = `
    SELECT o.OfficerID, o.OfficerName, o.OfficerRank, o.PhoneNumber,
           ps.StationName
    FROM Officer o
    LEFT JOIN PoliceStation ps ON o.StationID = ps.StationID
    ORDER BY o.OfficerName
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;