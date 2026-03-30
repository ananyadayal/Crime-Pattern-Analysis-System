-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- EXECUTION & OUTPUT VERIFICATION
-- ============================================================

SELECT * FROM Crime_By_Location;
SELECT * FROM Open_Cases;
SELECT * FROM Officer_Workload;
SELECT * FROM Severity_Summary;

CALL GetCrimesByStatus('Open');
CALL GetCrimesByStatus('Closed');
CALL GetCrimeSummaryByCity('Mumbai');
CALL GetCrimeSummaryByCity('Delhi');

CALL GenerateHighSeverityReport();