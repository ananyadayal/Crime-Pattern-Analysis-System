-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

DROP DATABASE IF EXISTS CrimeAnalytics;
CREATE DATABASE CrimeAnalytics;
USE CrimeAnalytics;

-- ============================================================
-- TABLE CREATION
-- ============================================================

-- Stores info for each crime location
CREATE TABLE Location (
    LocationID INT PRIMARY KEY AUTO_INCREMENT,
    AreaName VARCHAR(50) NOT NULL,
    Zone VARCHAR(50) NOT NULL,
    City VARCHAR(50) NOT NULL
);

-- Stores police station details
CREATE TABLE PoliceStation (
    StationID INT PRIMARY KEY AUTO_INCREMENT,
    StationName VARCHAR(100) NOT NULL,
    Address VARCHAR(100) NOT NULL,
    ContactNumber VARCHAR(15)  NOT NULL
);

-- Each officer belongs to one police station
CREATE TABLE Officer (
    OfficerID INT PRIMARY KEY AUTO_INCREMENT,
    OfficerName VARCHAR(100) NOT NULL,
    OfficerRank VARCHAR(50) NOT NULL,
    PhoneNumber VARCHAR(15),
    StationID INT,
    FOREIGN KEY (StationID) REFERENCES PoliceStation(StationID)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);

-- Stores suspect personal details
CREATE TABLE Suspect (
    SuspectID INT PRIMARY KEY AUTO_INCREMENT,
    SuspectName VARCHAR(100) NOT NULL,
    Age INT,
    Gender VARCHAR(10),
    CriminalHistory TEXT
);

-- Main crime table
-- Severity restricted to High/Medium/Low using CHECK constraint
CREATE TABLE Crime (
    CrimeID INT PRIMARY KEY AUTO_INCREMENT,
    CrimeType VARCHAR(100) NOT NULL,
    CrimeDate DATE NOT NULL,
    CrimeTime TIME,
    Severity VARCHAR(10) NOT NULL CHECK (Severity IN ('Low', 'Medium', 'High')),
    Status VARCHAR(20) NOT NULL DEFAULT 'Open',
    LocationID INT,
    StationID INT,
    SuspectID INT,
    OfficerID INT,
    FOREIGN KEY (LocationID) REFERENCES Location(LocationID),
    FOREIGN KEY (StationID) REFERENCES PoliceStation(StationID),
    FOREIGN KEY (SuspectID) REFERENCES Suspect(SuspectID),
    FOREIGN KEY (OfficerID) REFERENCES Officer(OfficerID)
);

-- Patrol assignments,each officer can have many patrols
CREATE TABLE PatrolAssignment (
    PatrolID INT PRIMARY KEY AUTO_INCREMENT,
    PatrolDate DATE NOT NULL,
    ShiftTime VARCHAR(20) NOT NULL,
    AreaCovered VARCHAR(100) NOT NULL,
    OfficerID INT,
    FOREIGN KEY (OfficerID) REFERENCES Officer(OfficerID)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);

-- Automatically filled by trigger when crime status changes
CREATE TABLE CrimeStatusLog (
    LogID INT PRIMARY KEY AUTO_INCREMENT,
    CrimeID INT,
    OldStatus VARCHAR(20),
    NewStatus VARCHAR(20),
    ChangedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
