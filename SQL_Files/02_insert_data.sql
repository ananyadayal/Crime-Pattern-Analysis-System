-- ============================================================
--  CRIME PATTERN ANALYSIS SYSTEM
--  Database Management Systems(MySQL)
--  Author: Ananya Dayal
-- ============================================================

-- ============================================================
-- DATA INSERTION
-- ============================================================

INSERT INTO Location (AreaName, Zone, City) VALUES
('Andheri',         'West',    'Mumbai'),
('Dadar',           'Central', 'Mumbai'),
('Bandra',          'West',    'Mumbai'),
('Kurla',           'East',    'Mumbai'),
('Connaught Place', 'Central', 'Delhi'),
('Rohini',          'North',   'Delhi'),
('Lajpat Nagar',    'South',   'Delhi'),
('Dwarka',          'West',    'Delhi'),
('Indiranagar',     'East',    'Bangalore'),
('Koramangala',     'South',   'Bangalore');

INSERT INTO PoliceStation (StationName, Address, ContactNumber) VALUES
('Andheri Police Station',     'SV Road, Andheri West',     '9876543210'),
('Dadar Police Station',       'Gokhale Road, Dadar',       '9876543211'),
('Connaught Place PS',         'Block A, CP',               '9123456780'),
('Rohini District Police',     'Sector 9, Rohini',          '9123456781'),
('Indiranagar Police Station', '100 Feet Road, Indiranagar','9845001234');

INSERT INTO Officer (OfficerName, OfficerRank, PhoneNumber, StationID) VALUES
('Rajesh Sharma',  'Inspector',        '9811001001', 1),
('Anita Verma',    'Sub-Inspector',    '9811001002', 2),
('Pradeep Singh',  'Inspector',        '9811001003', 3),
('Meena Pillai',   'Sub-Inspector',    '9811001004', 3),
('Arvind Tiwari',  'Deputy Inspector', '9811001005', 4),
('Sunita Rao',     'Inspector',        '9811001006', 5),
('Kartik Nair',    'Sub-Inspector',    '9811001007', 1),
('Deepa Menon',    'Constable',        '9811001008', 5);

INSERT INTO Suspect (SuspectName, Age, Gender, CriminalHistory) VALUES
('Rohit Mehta',   28, 'Male',   'Theft record in 2021'),
('Sameer Khan',   32, 'Male',   'No previous record'),
('Pooja Desai',   25, 'Female', 'Fraud case 2022, acquitted'),
('Vijay Yadav',   40, 'Male',   'Multiple theft records'),
('Kavita Joshi',  35, 'Female', 'No previous record'),
('Imran Shaikh',  29, 'Male',   'Drug possession in 2020'),
('Raju Tiwari',   45, 'Male',   'Assault record in 2019'),
('Neha Gupta',    22, 'Female', 'No previous record'),
('Sanjay Patil',  37, 'Male',   'Robbery 2018, served sentence'),
('Lakshmi Nair',  31, 'Female', 'No previous record'),
('Deepak Sharma', 50, 'Male',   'Cybercrime case pending'),
('Anjali Singh',  27, 'Female', 'Petty theft in 2023'),
('Mohd. Rafi',    33, 'Male',   'Gang activity suspected'),
('Sunita Devi',   41, 'Female', 'No previous record'),
('Prakash Reddy', 38, 'Male',   'Forgery in 2021');

INSERT INTO Crime (CrimeType, CrimeDate, CrimeTime, Severity, Status, LocationID, StationID, SuspectID, OfficerID) VALUES
('Robbery',          '2024-01-05', '21:30:00', 'High',   'Closed', 1,  1, 1,  1),
('Fraud',            '2024-01-12', '14:00:00', 'Medium', 'Closed', 5,  3, 2,  3),
('Theft',            '2024-01-18', '09:15:00', 'Low',    'Open',   2,  2, 4,  2),
('Drug Possession',  '2024-01-22', '23:00:00', 'High',   'Open',   6,  4, 6,  5),
('Assault',          '2024-01-28', '20:45:00', 'High',   'Closed', 3,  1, 7,  1),
('Cybercrime',       '2024-02-03', '11:00:00', 'Medium', 'Open',   9,  5, 11, 6),
('Vandalism',        '2024-02-07', '03:00:00', 'Low',    'Closed', 4,  2, 12, 2),
('Robbery',          '2024-02-10', '22:00:00', 'High',   'Open',   7,  4, 9,  4),
('Theft',            '2024-02-14', '10:30:00', 'Low',    'Open',   10, 5, 8,  8),
('Fraud',            '2024-02-17', '15:00:00', 'Medium', 'Closed', 5,  3, 15, 3),
('Assault',          '2024-02-20', '19:00:00', 'High',   'Open',   1,  1, 13, 7),
('Drug Trafficking', '2024-02-24', '02:30:00', 'High',   'Open',   6,  4, 6,  5),
('Theft',            '2024-02-27', '08:00:00', 'Low',    'Closed', 9,  5, 12, 6),
('Vandalism',        '2024-03-02', '04:00:00', 'Low',    'Open',   2,  2, 4,  2),
('Cybercrime',       '2024-03-05', '13:00:00', 'Medium', 'Open',   5,  3, 11, 3),
('Robbery',          '2024-03-08', '23:30:00', 'High',   'Open',   8,  4, 9,  5),
('Fraud',            '2024-03-10', '16:00:00', 'Medium', 'Open',   1,  1, 3,  1),
('Assault',          '2024-03-12', '20:00:00', 'High',   'Closed', 7,  4, 7,  4),
('Theft',            '2024-03-15', '07:30:00', 'Low',    'Open',   3,  1, 8,  7),
('Drug Possession',  '2024-03-17', '22:00:00', 'Medium', 'Open',   10, 5, 6,  8),
('Robbery',          '2024-03-19', '21:00:00', 'High',   'Open',   4,  2, 13, 2),
('Fraud',            '2024-03-20', '12:00:00', 'Medium', 'Closed', 6,  4, 15, 5),
('Cybercrime',       '2024-03-21', '10:00:00', 'High',   'Open',   9,  5, 11, 6),
('Vandalism',        '2024-03-22', '01:00:00', 'Low',    'Open',   2,  2, 12, 7),
('Assault',          '2024-03-23', '18:30:00', 'High',   'Open',   5,  3, 13, 3);

INSERT INTO PatrolAssignment (PatrolDate, ShiftTime, AreaCovered, OfficerID) VALUES
('2024-03-01', 'Morning (6AM-2PM)',   'Andheri West',    1),
('2024-03-01', 'Night (10PM-6AM)',    'Dadar',           2),
('2024-03-05', 'Evening (2PM-10PM)', 'Connaught Place',  3),
('2024-03-07', 'Morning (6AM-2PM)',  'Rohini Sector 5',  5),
('2024-03-10', 'Night (10PM-6AM)',   'Indiranagar',      6),
('2024-03-12', 'Evening (2PM-10PM)', 'Bandra',           7),
('2024-03-15', 'Morning (6AM-2PM)',  'Kurla East',       1),
('2024-03-18', 'Night (10PM-6AM)',   'Koramangala',      8),
('2024-03-20', 'Evening (2PM-10PM)', 'Lajpat Nagar',     4),
('2024-03-22', 'Morning (6AM-2PM)',  'Dwarka Sector 10', 5);
