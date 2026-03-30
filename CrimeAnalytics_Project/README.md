# Crime Pattern Analysis System

A database-driven system built with MySQL to store and analyse crime data. 
The idea was to see how a proper relational database can turn raw crime 
records into actual useful insights — like which areas are most dangerous, 
which officers are handling the most cases, and which crimes are still unresolved.

---

## What it does

- Stores crime records linked to locations, suspects, officers and police stations.
- Identifies crime hotspots and risk levels by area.
- Tracks officer workload and open vs closed cases.
- Automatically logs whenever a crime status is updated.
- Generates reports for high severity unresolved crimes.

---

## Database Design

- 7 tables with proper primary and foreign key relationships
- Normalized up to 3NF
- ER diagram generated using MySQL Workbench

---

## Features Implemented

- **Views** — for crime hotspots, open cases, officer workload and severity breakdown
- **Stored Procedures** — to fetch crimes by status and by city
- **Functions** — to calculate total crimes and risk level per area
- **Triggers** — auto status setting, severity validation, and audit logging
- **Cursor** — to generate high severity crime reports row by row
- **Transactions** — with savepoints to ensure data consistency

---

## Tech Used

- MySQL
- MySQL Workbench

---

## How to Run

1. Open MySQL Workbench
2. Run the files in this order:
   -`01_schema.sql` — creates the database and all tables
   -`02_insert_data.sql` — inserts sample data
   -`03_views.sql` — creates analytical views
   -`04_procedure.sql` — stored procedures
   -`05_functions.sql` — user defined functions
   -`06_triggers.sql` — triggers for automation and data integrity
   -`07_cursor.sql` — cursor based report generation
   -`08_transaction_management.sql` — transaction with savepoint
   -`09_analytical_queries.sql` — crime hotspots, trends and insights
   -`10_execution_and_output_verification.sql` — runs everything and verifies output

---

## Screenshots

All output screenshots are in the `Screenshots` folder organized by category.