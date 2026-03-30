-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- TRIGGERS
-- ============================================================

DELIMITER //

-- Trigger 1: Set status to 'Open' if not provided during insert
CREATE TRIGGER set_default_status
BEFORE INSERT ON Crime
FOR EACH ROW
BEGIN
    IF NEW.Status IS NULL OR NEW.Status = '' THEN
        SET NEW.Status = 'Open';
    END IF;
END //

-- Trigger 2: Reject insert if severity value is invalid
CREATE TRIGGER validate_severity
BEFORE INSERT ON Crime
FOR EACH ROW
BEGIN
    IF NEW.Severity NOT IN ('Low', 'Medium', 'High') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ERROR: Severity must be Low, Medium, or High';
    END IF;
END //

-- Trigger 3: Log crime status changes automatically
CREATE TRIGGER log_status_change
AFTER UPDATE ON Crime
FOR EACH ROW
BEGIN
    IF OLD.Status <> NEW.Status THEN
        INSERT INTO CrimeStatusLog (CrimeID, OldStatus, NewStatus)
        VALUES (OLD.CrimeID, OLD.Status, NEW.Status);
    END IF;
END //

DELIMITER ;