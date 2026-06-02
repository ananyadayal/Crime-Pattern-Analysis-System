-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- TRANSACTION MANAGEMENT
-- ============================================================

START TRANSACTION;

    SAVEPOINT before_insert;

    INSERT INTO Crime (CrimeType, CrimeDate, CrimeTime, Severity, Status, LocationID, StationID, SuspectID, OfficerID)
    VALUES ('Kidnapping', '2024-03-25', '03:00:00', 'High', 'Open', 3, 1, 5, 1);

    INSERT INTO PatrolAssignment (PatrolDate, ShiftTime, AreaCovered, OfficerID)
    VALUES ('2024-03-25', 'Night (10PM-6AM)', 'Bandra', 1);

COMMIT;
-- If anything fails, run: ROLLBACK TO before_insert;