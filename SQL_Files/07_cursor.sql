-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- CURSOR
-- ============================================================

DELIMITER //

CREATE PROCEDURE GenerateHighSeverityReport()
BEGIN
    DECLARE done      INT DEFAULT FALSE;
    DECLARE v_id      INT;
    DECLARE v_type    VARCHAR(100);
    DECLARE v_area    VARCHAR(50);
    DECLARE v_date    DATE;
    DECLARE v_officer VARCHAR(100);

    DECLARE crime_cursor CURSOR FOR
        SELECT C.CrimeID, C.CrimeType, L.AreaName, C.CrimeDate, O.OfficerName
        FROM Crime C
        JOIN Location L ON C.LocationID = L.LocationID
        JOIN Officer  O ON C.OfficerID  = O.OfficerID
        WHERE C.Status = 'Open' AND C.Severity = 'High'
        ORDER BY C.CrimeDate;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    CREATE TEMPORARY TABLE IF NOT EXISTS HSReport (
        CrimeID   INT,
        CrimeType VARCHAR(100),
        Area      VARCHAR(50),
        CrimeDate DATE,
        Officer   VARCHAR(100)
    );

    OPEN crime_cursor;
    read_loop: LOOP
        FETCH crime_cursor INTO v_id, v_type, v_area, v_date, v_officer;
        IF done THEN
            LEAVE read_loop;
        END IF;
        INSERT INTO HSReport VALUES (v_id, v_type, v_area, v_date, v_officer);
    END LOOP;
    CLOSE crime_cursor;

    SELECT * FROM HSReport;
    DROP TEMPORARY TABLE HSReport;
END //

DELIMITER ;
