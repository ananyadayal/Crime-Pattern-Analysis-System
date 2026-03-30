-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- FUNCTIONS
-- ============================================================

DELIMITER //

-- Function 1: Total crimes in a given area
CREATE FUNCTION GetTotalCrimesInArea(area_name VARCHAR(50))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total
    FROM Crime C
    JOIN Location L ON C.LocationID = L.LocationID
    WHERE L.AreaName = area_name;
    RETURN total;
END //

-- Function 2: Risk level of an area based on crime count
CREATE FUNCTION GetRiskLevel(area_name VARCHAR(50))
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE crime_count INT;
    DECLARE risk VARCHAR(20);
	SELECT COUNT(*) INTO crime_count
    FROM Crime C
    JOIN Location L ON C.LocationID = L.LocationID
    WHERE L.AreaName = area_name;

    IF crime_count >= 5 THEN
        SET risk = 'High Risk';
    ELSEIF crime_count >= 3 THEN
        SET risk = 'Medium Risk';
    ELSE
        SET risk = 'Low Risk';
    END IF;

    RETURN risk;
END //

DELIMITER ;