-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- ANALYTICAL QUERIES
-- ============================================================

-- Crime hotspots
SELECT L.AreaName, L.City, COUNT(C.CrimeID) AS TotalCrimes
FROM Crime C
JOIN Location L ON C.LocationID = L.LocationID
GROUP BY L.LocationID, L.AreaName, L.City
ORDER BY TotalCrimes DESC;

-- Most common crime types
SELECT CrimeType, COUNT(*) AS Frequency
FROM Crime
GROUP BY CrimeType
ORDER BY Frequency DESC;

-- Open vs Closed count
SELECT Status, COUNT(*) AS Count
FROM Crime
GROUP BY Status ORDER BY COUNT(*) DESC;

-- Monthly crime trend
SELECT DATE_FORMAT(CrimeDate, '%m-%Y') AS Month, COUNT(*) AS TotalCrimes
FROM Crime
GROUP BY Month
ORDER BY Month;

-- Suspects involved in more than one crime
SELECT S.SuspectName, COUNT(C.CrimeID) AS TimesInvolved
FROM Suspect S
JOIN Crime C ON S.SuspectID = C.SuspectID
GROUP BY S.SuspectID, S.SuspectName
HAVING COUNT(C.CrimeID) > 1 ORDER BY COUNT(C.CrimeId) DESC;

-- Risk level per area using our function
SELECT
    AreaName,
    GetTotalCrimesInArea(AreaName) AS CrimeCount,
    GetRiskLevel(AreaName) AS RiskLevel
FROM Location ORDER BY 
CASE GetRiskLevel(AreaName)
        WHEN 'High Risk'   THEN 1
        WHEN 'Medium Risk' THEN 2
        WHEN 'Low Risk'    THEN 3
END ASC;

-- Testing trigger
UPDATE Crime SET Status = 'Closed' WHERE CrimeID = 11;
SELECT * FROM CrimeStatusLog;
