-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- VIEWS
-- ============================================================

-- View 1: Crime count per area
CREATE VIEW Crime_By_Location AS
SELECT
    L.AreaName,
    L.City,
    COUNT(C.CrimeID) AS TotalCrimes
FROM Crime C
JOIN Location L ON C.LocationID = L.LocationID
GROUP BY L.LocationID, L.AreaName, L.City
ORDER BY TotalCrimes DESC;

-- View 2: All unresolved crimes
CREATE VIEW Open_Cases AS
SELECT
    C.CrimeID,
    C.CrimeType,
    C.CrimeDate,
    C.Severity,
    C.Status,
    L.AreaName,
    L.City
FROM Crime C
JOIN Location L ON C.LocationID = L.LocationID
WHERE C.Status = 'Open'
ORDER BY 
CASE C.Severity
        WHEN 'High'   THEN 1
        WHEN 'Medium' THEN 2
        WHEN 'Low'    THEN 3
END ASC;

-- View 3: Cases handled per officer
CREATE VIEW Officer_Workload AS
SELECT
    O.OfficerName,
    O.OfficerRank,
    PS.StationName,
    COUNT(C.CrimeID) AS CasesHandled
FROM Officer O
LEFT JOIN Crime C ON O.OfficerID = C.OfficerID
JOIN PoliceStation PS ON O.StationID = PS.StationID
GROUP BY O.OfficerID, O.OfficerName, O.OfficerRank, PS.StationName
ORDER BY CasesHandled DESC;

-- View 4: Crime breakdown by severity
CREATE VIEW Severity_Summary AS
SELECT
    Severity,
    COUNT(*)                                             AS TotalCrimes,
    SUM(CASE WHEN Status = 'Open'   THEN 1 ELSE 0 END)  AS OpenCases,
    SUM(CASE WHEN Status = 'Closed' THEN 1 ELSE 0 END)  AS ClosedCases
FROM Crime
GROUP BY Severity;
