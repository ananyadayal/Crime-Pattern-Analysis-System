-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- STORED PROCEDURES
-- ============================================================

DELIMITER //

-- Procedure 1: Fetch crimes by status
CREATE PROCEDURE GetCrimesByStatus(IN crime_status VARCHAR(20))
BEGIN
    SELECT
        C.CrimeID,
        C.CrimeType,
        C.CrimeDate,
        C.Severity,
        C.Status,
        L.AreaName,
        O.OfficerName
    FROM Crime C
    JOIN Location L ON C.LocationID = L.LocationID
    JOIN Officer  O ON C.OfficerID  = O.OfficerID
    WHERE C.Status = crime_status
    ORDER BY C.CrimeDate DESC;
END //

-- Procedure 2: Fetch all crimes in a city
CREATE PROCEDURE GetCrimeSummaryByCity(IN city_name VARCHAR(50))
BEGIN
    SELECT
        C.CrimeID,
        C.CrimeType,
        C.Severity,
        C.Status,
        L.AreaName,
        C.CrimeDate
    FROM Crime C
    JOIN Location L ON C.LocationID = L.LocationID
    WHERE L.City = city_name
    ORDER BY C.CrimeDate DESC;
END //

DELIMITER ;
