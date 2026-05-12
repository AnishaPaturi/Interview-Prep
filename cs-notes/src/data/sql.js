// PART 1: SQL BASICS + DATABASE OPERATIONS

const sqlBasics = {

  // ══════════════════════════════════════════════
  //               SQL BASICS
  // ══════════════════════════════════════════════

  "What is SQL": {
    explanation: "SQL (Structured Query Language) is a standardized language for interacting with Relational Database Management Systems (RDBMS). It allows you to create, read, update, and delete data in a structured tabular format. SQL is declarative — you describe *what* you want, and the database engine figures out *how* to get it.",
    details: [
      "Developed by IBM researchers in the 1970s (originally called SEQUEL); standardized by ANSI in 1986",
      "Powers nearly every enterprise system: banking, e-commerce, healthcare, social media",
      "Relational databases store data in tables (rows × columns), linked by keys",
      "Major RDBMSs: MySQL, PostgreSQL, Oracle, Microsoft SQL Server, SQLite, MariaDB",
      "SQL is NOT case-sensitive for keywords (SELECT = select = Select), but identifiers may be",
      "Each vendor has slight SQL dialect differences (T-SQL for SQL Server, PL/SQL for Oracle)"
    ],
    example: `-- SQL lets you interact with data in human-readable statements

-- Retrieve all employees earning above average salary
SELECT Name, Department, Salary
FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees)
ORDER BY Salary DESC;

-- The database engine handles: disk access, indexing, query optimization
-- You just declare the WHAT, not the HOW`
  },

  "SQL Syntax": {
    explanation: "SQL syntax is the set of grammatical rules governing how SQL statements must be written. Every statement has a defined structure — clauses appear in a mandatory order and have required/optional components.",
    details: [
      "Statements end with semicolon (;) — required in scripts, optional in single interactive queries",
      "SQL Keywords conventionally written in UPPERCASE (SELECT, FROM, WHERE, etc.)",
      "String literals use single quotes: 'Alice'. Double quotes wrap identifiers: \"MyColumn\"",
      "Single-line comments: -- comment. Multi-line: /* comment */",
      "Mandatory clause order: SELECT → FROM → JOIN → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT",
      "Logical processing order (different!): FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT"
    ],
    example: `-- Anatomy of a full SQL SELECT statement

SELECT   department,           -- 1. Columns to retrieve
         COUNT(*) AS headcount, -- Aggregate with alias
         AVG(salary) AS avg_sal -- Another aggregate
FROM     employees              -- 2. Source table
JOIN     departments USING(dept_id) -- 3. Join another table
WHERE    hire_date >= '2020-01-01'  -- 4. Row filter (pre-group)
GROUP BY department                  -- 5. Group rows
HAVING   COUNT(*) > 3               -- 6. Group filter (post-group)
ORDER BY avg_sal DESC               -- 7. Sort result
LIMIT    5;                         -- 8. Restrict output rows

-- Single-line comment: ignored by SQL engine
/* Multi-line comment:
   great for documentation */`
  },

  "SQL Data Types": {
    explanation: "SQL data types define what kind of value a column can store. Choosing the right data type is crucial for data integrity, storage efficiency, and query performance. Types vary slightly between database engines.",
    details: [
      "NUMERIC: INT / INTEGER, BIGINT, SMALLINT, TINYINT, DECIMAL(p,s), NUMERIC(p,s), FLOAT, DOUBLE, REAL",
      "STRING: CHAR(n) — fixed length, VARCHAR(n) — variable length, TEXT — large text, CLOB — character large object",
      "DATE/TIME: DATE (YYYY-MM-DD), TIME (HH:MM:SS), DATETIME, TIMESTAMP, YEAR, INTERVAL",
      "BOOLEAN: BOOLEAN or BOOL (MySQL stores as TINYINT(1), 0=false, 1=true)",
      "BINARY: BINARY(n), VARBINARY(n), BLOB — binary large objects (images, files)",
      "Special: JSON, XML, UUID, ARRAY (PostgreSQL), ENUM, SET",
      "DECIMAL(10,2): 10 total digits, 2 after decimal — perfect for money",
      "CHAR vs VARCHAR: CHAR(10) always uses 10 bytes; VARCHAR(10) uses only what's needed (+ 1-2 bytes overhead)"
    ],
    example: `-- Choosing the right data types matters

CREATE TABLE Products (
    ProductID    INT            PRIMARY KEY,    -- whole numbers
    SKU          CHAR(8)        NOT NULL,       -- always 8 chars: 'ABC-0001'
    Name         VARCHAR(200)   NOT NULL,       -- variable length text
    Description  TEXT,                          -- unlimited text
    Price        DECIMAL(10, 2) NOT NULL,       -- exact: 99999999.99
    Weight       FLOAT,                         -- approximate decimals OK
    InStock      BOOLEAN        DEFAULT TRUE,   -- true/false
    CreatedAt    TIMESTAMP      DEFAULT NOW(),  -- date + time
    ImageData    BLOB,                          -- binary: store images
    Tags         JSON                           -- structured data (MySQL 5.7+)
);

-- DECIMAL vs FLOAT: never use FLOAT for money!
-- FLOAT(0.1) + FLOAT(0.2) = 0.30000000000000004 (floating point error)
-- DECIMAL(0.1) + DECIMAL(0.2) = 0.3 (exact)`
  },

  "SQL Operators": {
    explanation: "SQL operators are symbols or keywords used to perform operations on values in expressions. They are used in WHERE clauses, SELECT expressions, JOIN conditions, and HAVING clauses.",
    details: [
      "Arithmetic: + (add), - (subtract), * (multiply), / (divide), % (modulo)",
      "Comparison: = (equal), != or <> (not equal), < > <= >= (relational)",
      "Logical: AND, OR, NOT — combine multiple conditions",
      "String: LIKE (pattern match), CONCAT (||), REGEXP/RLIKE (regex)",
      "Set: IN (match list), BETWEEN (range), EXISTS (subquery check)",
      "NULL: IS NULL, IS NOT NULL — never use = NULL (always false!)",
      "Operator precedence: NOT > AND > OR (use parentheses to be explicit)",
      "Bitwise: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift)"
    ],
    example: `-- Arithmetic operators
SELECT Price, Price * 1.18 AS PriceWithTax, Price * Qty AS Total
FROM OrderItems;

-- Comparison + Logical
SELECT * FROM Employees
WHERE (Department = 'Sales' OR Department = 'Marketing')
  AND Salary BETWEEN 40000 AND 80000
  AND Manager IS NOT NULL;

-- Operator precedence trap
-- WRONG interpretation: A OR (B AND C)  ← AND binds tighter
SELECT * FROM T WHERE A = 1 OR B = 2 AND C = 3;

-- CORRECT explicit grouping:
SELECT * FROM T WHERE (A = 1 OR B = 2) AND C = 3;

-- String operator
SELECT CONCAT(FirstName, ' ', LastName) AS FullName FROM Users;`
  },

  "SQL Commands": {
    explanation: "SQL commands are categorized into 5 major groups based on their purpose. Understanding this classification helps you know what permissions are needed and what each command does to the database.",
    details: [
      "DDL (Data Definition Language): Define/modify structure — CREATE, ALTER, DROP, TRUNCATE, RENAME",
      "DML (Data Manipulation Language): Manipulate data — SELECT, INSERT, UPDATE, DELETE, MERGE",
      "DQL (Data Query Language): Some separate SELECT into its own category",
      "DCL (Data Control Language): Manage permissions — GRANT, REVOKE",
      "TCL (Transaction Control Language): Manage transactions — COMMIT, ROLLBACK, SAVEPOINT",
      "DDL commands are auto-committed (cannot be rolled back in most databases)",
      "DML commands within a transaction CAN be rolled back",
      "DCL commands typically auto-commit and require admin privileges"
    ],
    example: `-- DDL: Changes structure (auto-committed)
CREATE TABLE Logs (id INT, msg VARCHAR(500));
ALTER TABLE Logs ADD COLUMN created_at TIMESTAMP;
DROP TABLE Logs;

-- DML: Changes data (can be rolled back)
INSERT INTO Employees VALUES (1, 'Alice', 75000);
UPDATE Employees SET Salary = 80000 WHERE EmpID = 1;
DELETE FROM Employees WHERE EmpID = 1;

-- DCL: Controls access
GRANT SELECT, INSERT ON Employees TO 'analyst_user';
REVOKE DELETE ON Employees FROM 'analyst_user';

-- TCL: Controls transactions
BEGIN;
  UPDATE Accounts SET Balance = Balance - 500 WHERE ID = 1;
  UPDATE Accounts SET Balance = Balance + 500 WHERE ID = 2;
COMMIT; -- or ROLLBACK if something went wrong`
  },

  "DDL Commands": {
    explanation: "DDL (Data Definition Language) commands define and modify the structure of database objects like tables, indexes, and schemas. They operate on the schema (structure) rather than the data itself, and most are auto-committed.",
    details: [
      "CREATE: Creates new database objects (database, table, index, view, procedure, function)",
      "ALTER: Modifies existing objects — add/drop/modify columns, add constraints, rename",
      "DROP: Permanently deletes objects and all their data — irreversible without backup!",
      "TRUNCATE: Removes all rows from a table but keeps structure; faster than DELETE; cannot be rolled back in most DBs",
      "RENAME: Renames a database object",
      "COMMENT: Adds comments to data dictionary",
      "DDL statements cause an implicit COMMIT in MySQL — no rollback possible",
      "PostgreSQL DDL can be rolled back within a transaction (unique feature)"
    ],
    example: `-- CREATE: define new structure
CREATE TABLE Students (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    Name      VARCHAR(100) NOT NULL,
    GPA       DECIMAL(3,2) CHECK (GPA BETWEEN 0.0 AND 4.0)
);

-- ALTER: modify structure
ALTER TABLE Students ADD COLUMN Email VARCHAR(150) UNIQUE;
ALTER TABLE Students MODIFY COLUMN Name VARCHAR(200);
ALTER TABLE Students DROP COLUMN GPA;
ALTER TABLE Students RENAME TO Learners;

-- TRUNCATE: empty table, keep structure
TRUNCATE TABLE Learners;  -- faster than DELETE *, resets AUTO_INCREMENT

-- DROP: destroy completely
DROP TABLE IF EXISTS Learners;   -- IF EXISTS avoids error if not found
DROP DATABASE old_archive;`
  },

  "DML Commands": {
    explanation: "DML (Data Manipulation Language) commands manipulate the actual data within database tables. These are the day-to-day operations: reading, writing, changing, and removing records. DML commands within a transaction can be rolled back.",
    details: [
      "SELECT: Retrieve data — the most frequently used SQL command",
      "INSERT: Add new rows to a table",
      "UPDATE: Modify existing rows — ALWAYS use WHERE or you update all rows!",
      "DELETE: Remove rows — ALWAYS use WHERE or you delete all rows!",
      "MERGE (UPSERT): Insert or update based on a condition — supported in Oracle, SQL Server, PostgreSQL",
      "DML changes are not permanent until COMMITted (in auto-commit off mode)",
      "Use SELECT first to verify rows before UPDATE or DELETE — a safe habit",
      "Row locks are acquired during DML in concurrent environments"
    ],
    example: `-- SELECT: Read data
SELECT Name, Salary FROM Employees WHERE DeptID = 3;

-- INSERT: Add data (single row)
INSERT INTO Employees (Name, DeptID, Salary) VALUES ('Bob', 3, 65000);

-- INSERT: Multiple rows
INSERT INTO Employees (Name, DeptID, Salary) VALUES
  ('Carol', 2, 72000),
  ('Dave',  1, 58000);

-- UPDATE: Change data (ALWAYS use WHERE!)
UPDATE Employees SET Salary = Salary * 1.1 WHERE DeptID = 3;

-- DELETE: Remove data (ALWAYS use WHERE!)
DELETE FROM Employees WHERE Salary < 30000;

-- MERGE (UPSERT) - PostgreSQL syntax
INSERT INTO Employees (EmpID, Name, Salary)
VALUES (1, 'Alice', 80000)
ON CONFLICT (EmpID)
DO UPDATE SET Salary = EXCLUDED.Salary;`
  },

  "DQL Commands": {
    explanation: "DQL (Data Query Language) refers specifically to the SELECT command used to query and retrieve data from the database. Some SQL classifications separate SELECT from DML because it doesn't modify data — it only reads it.",
    details: [
      "SELECT is the heart of SQL — every analyst and developer uses it constantly",
      "DQL = SELECT in most classifications; everything else is DML/DDL/DCL/TCL",
      "SELECT does NOT modify data — it's safe to run in production environments",
      "Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT",
      "Writing order (what you type): SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT",
      "Complex SELECT can join dozens of tables, use subqueries, CTEs, window functions"
    ],
    example: `-- Simple DQL
SELECT * FROM Products;

-- Filtered DQL
SELECT ProductName, Price FROM Products WHERE Price < 100;

-- Aggregated DQL
SELECT Category, COUNT(*) AS Total, AVG(Price) AS AvgPrice
FROM Products
GROUP BY Category
HAVING AVG(Price) > 50
ORDER BY AvgPrice DESC;

-- DQL with subquery
SELECT Name FROM Employees
WHERE DeptID = (SELECT DeptID FROM Departments WHERE DeptName = 'Engineering');`
  },

  "DCL Commands": {
    explanation: "DCL (Data Control Language) commands manage user permissions and access control in a database. They control who can do what to which database objects — essential for security in multi-user environments.",
    details: [
      "GRANT: Give specific privileges to a user or role",
      "REVOKE: Remove previously granted privileges from a user or role",
      "Privileges: SELECT, INSERT, UPDATE, DELETE, EXECUTE, CREATE, DROP, ALL PRIVILEGES",
      "Privileges can be granted at different levels: global, database, table, column, routine",
      "WITH GRANT OPTION: allows the user to grant the same privilege to others",
      "Roles: Named groups of privileges — grant the role instead of individual privileges",
      "DCL commands auto-commit — they cannot be rolled back",
      "Only users with GRANT OPTION or admin rights can execute DCL commands"
    ],
    example: `-- Create a user (MySQL)
CREATE USER 'analyst'@'localhost' IDENTIFIED BY 'SecurePass123!';

-- GRANT specific privileges
GRANT SELECT, INSERT ON company_db.employees TO 'analyst'@'localhost';
GRANT SELECT ON company_db.* TO 'analyst'@'localhost'; -- all tables in db
GRANT ALL PRIVILEGES ON company_db.* TO 'admin'@'%';  -- all privileges

-- GRANT with ability to re-grant
GRANT SELECT ON reports.* TO 'teamlead'@'%' WITH GRANT OPTION;

-- REVOKE privileges
REVOKE INSERT ON company_db.employees FROM 'analyst'@'localhost';
REVOKE ALL PRIVILEGES ON company_db.* FROM 'analyst'@'localhost';

-- View user privileges
SHOW GRANTS FOR 'analyst'@'localhost';

-- Roles (MySQL 8+)
CREATE ROLE 'read_only', 'data_entry';
GRANT SELECT ON company_db.* TO 'read_only';
GRANT SELECT, INSERT, UPDATE ON company_db.* TO 'data_entry';
GRANT 'read_only' TO 'analyst'@'localhost';`
  },

  "TCL Commands": {
    explanation: "TCL (Transaction Control Language) commands manage transactions — logical units of work that must either fully succeed or fully fail. TCL is critical for data integrity in multi-step operations like bank transfers.",
    details: [
      "COMMIT: Permanently save all changes made in the current transaction",
      "ROLLBACK: Undo all changes made since the last COMMIT or SAVEPOINT",
      "SAVEPOINT: Create a named checkpoint within a transaction to rollback to partially",
      "RELEASE SAVEPOINT: Destroy a savepoint (changes up to it remain pending)",
      "SET TRANSACTION: Configure transaction isolation level",
      "Auto-commit: Most databases run in auto-commit mode by default (each statement auto-commits)",
      "Disable auto-commit with: SET autocommit = 0; or BEGIN/START TRANSACTION",
      "ACID properties (Atomicity, Consistency, Isolation, Durability) are enforced by transactions"
    ],
    example: `-- Classic bank transfer — must be atomic
START TRANSACTION;

  UPDATE Accounts SET Balance = Balance - 1000 WHERE AccID = 'A001';
  UPDATE Accounts SET Balance = Balance + 1000 WHERE AccID = 'A002';

  -- Check for error, if something went wrong:
  -- ROLLBACK; ← undoes both UPDATEs

COMMIT;  -- makes both changes permanent

-- SAVEPOINT example
START TRANSACTION;
  INSERT INTO Orders (OrdID, Amount) VALUES (501, 250);
  SAVEPOINT after_order;

  INSERT INTO OrderItems (OrdID, ItemID, Qty) VALUES (501, 99, 2);
  -- Oops, item 99 doesn't exist
  ROLLBACK TO after_order;  -- undo only the item insert

  INSERT INTO OrderItems (OrdID, ItemID, Qty) VALUES (501, 45, 2);
COMMIT;`
  },

  "SQL Comments": {
    explanation: "SQL comments are text ignored by the SQL engine, used for documentation, explanation, and temporarily disabling code. Good commenting is essential in complex queries and stored procedures.",
    details: [
      "Single-line comment: -- (two dashes) followed by text; everything after is ignored",
      "Multi-line comment: /* text */ — can span multiple lines or inline",
      "MySQL also supports # as single-line comment (non-standard)",
      "Comments don't affect performance or execution",
      "Use comments to document: purpose, author, date, parameter descriptions, complex logic",
      "Inline comments explain specific parts of a line",
      "Block comments are great for temporarily disabling a section of SQL",
      "Stored procedures and functions benefit greatly from comments"
    ],
    example: `-- This is a single-line comment

SELECT
    EmpID,          -- primary key
    Name,           -- full name (first + last)
    Salary * 1.18   -- salary including 18% tax gross-up
FROM Employees
/* This filter excludes terminated employees
   and contractors — only active full-time staff */
WHERE Status = 'Active'
  AND EmployeeType = 'FTE'; -- Full Time Employee

/*
  Author   : Data Team
  Created  : 2024-01-15
  Purpose  : Monthly payroll report
  Modified : 2024-06-01 — added tax column
*/

# MySQL-only hash comment (avoid for portability)
SELECT 1; # inline MySQL comment`
  },

  // ══════════════════════════════════════════════
  //           DATABASE OPERATIONS
  // ══════════════════════════════════════════════

  "CREATE DATABASE": {
    explanation: "CREATE DATABASE creates a new empty database (schema) in the RDBMS. It establishes the container that will hold all tables, views, procedures, and other objects for a specific application or purpose.",
    details: [
      "Syntax: CREATE DATABASE database_name;",
      "IF NOT EXISTS: Prevents error if database already exists",
      "CHARACTER SET: Specifies default character encoding (utf8mb4 recommended for full Unicode including emojis)",
      "COLLATE: Defines sorting/comparison rules for string data",
      "utf8mb4_unicode_ci: case-insensitive comparison (ci) — most common choice",
      "One RDBMS instance can host multiple databases",
      "Databases are isolated — tables in one DB cannot directly reference tables in another without full qualification",
      "Requires CREATE DATABASE privilege (admin/root in most setups)"
    ],
    example: `-- Basic
CREATE DATABASE company_db;

-- With IF NOT EXISTS (safe to run multiple times)
CREATE DATABASE IF NOT EXISTS company_db;

-- Full options (MySQL) — always use utf8mb4!
CREATE DATABASE company_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- PostgreSQL
CREATE DATABASE company_db
  ENCODING 'UTF8'
  LC_COLLATE 'en_US.utf8'
  LC_CTYPE 'en_US.utf8';

-- SQL Server
CREATE DATABASE company_db
ON PRIMARY (
  NAME = 'company_db_data',
  FILENAME = '/var/opt/mssql/data/company_db.mdf'
);`
  },

  "DROP DATABASE": {
    explanation: "DROP DATABASE permanently deletes an entire database and ALL its contents — tables, data, views, procedures, everything. This is irreversible without a backup. Use with extreme caution!",
    details: [
      "Syntax: DROP DATABASE database_name;",
      "IF EXISTS: Prevents error if database doesn't exist",
      "Cannot drop the currently active/in-use database in most systems",
      "Requires DROP privilege (admin/root level)",
      "In production: ALWAYS take a backup before dropping",
      "SQL Server: Cannot drop if there are active connections — use SINGLE_USER mode first",
      "Some systems: DROP SCHEMA is equivalent to DROP DATABASE",
      "Irreversible — there is no 'undo' unless you have backups or bin logs"
    ],
    example: `-- Basic drop (errors if not found)
DROP DATABASE old_database;

-- Safe drop (no error if not found) 
DROP DATABASE IF EXISTS old_database;

-- Best practice: backup first!
-- mysqldump -u root -p company_db > backup_$(date +%F).sql
-- Then: DROP DATABASE company_db;

-- SQL Server: force drop with active connections
ALTER DATABASE company_db SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
DROP DATABASE company_db;

-- PostgreSQL
DROP DATABASE IF EXISTS company_db;

-- Check what databases exist before dropping
SHOW DATABASES;         -- MySQL
SELECT datname FROM pg_database;  -- PostgreSQL`
  },

  "SHOW DATABASES": {
    explanation: "SHOW DATABASES (MySQL) lists all databases accessible to the current user. The equivalent commands exist in other databases. Used to explore what databases exist on the server.",
    details: [
      "MySQL: SHOW DATABASES; or SHOW SCHEMAS;",
      "PostgreSQL: \\l or SELECT datname FROM pg_database;",
      "SQL Server: SELECT name FROM sys.databases;",
      "SQLite: .databases (dot command in CLI)",
      "Only shows databases the current user has privilege to access",
      "System databases (mysql, information_schema, performance_schema) appear too — don't modify them!",
      "SHOW DATABASES LIKE 'pattern%': filter by name pattern"
    ],
    example: `-- MySQL: list all databases
SHOW DATABASES;
-- Result:
-- +--------------------+
-- | Database           |
-- +--------------------+
-- | company_db         |
-- | information_schema |
-- | mysql              |
-- | performance_schema |
-- | test_db            |
-- +--------------------+

SHOW DATABASES LIKE 'comp%';  -- filter by prefix

-- PostgreSQL equivalent
SELECT datname AS database_name FROM pg_database ORDER BY datname;

-- SQL Server equivalent
SELECT name AS database_name, create_date
FROM sys.databases
ORDER BY name;

-- Information schema (portable across databases)
SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA;`
  },

  "USE DATABASE": {
    explanation: "USE selects a database as the default/active database for the current session. Once selected, all unqualified table references (without db.table prefix) refer to tables in the active database.",
    details: [
      "Syntax: USE database_name;",
      "Sets the active database context for the session",
      "After USE, you can reference tables without the database prefix: SELECT * FROM employees (not company_db.employees)",
      "Without USE, you must fully qualify: SELECT * FROM company_db.employees",
      "PostgreSQL uses \\c database_name or connection strings — no USE command",
      "SQL Server: USE database_name; works similarly",
      "Cross-database queries require full qualification: db1.table JOIN db2.table"
    ],
    example: `-- Select active database
USE company_db;

-- Now tables can be referenced without prefix
SELECT * FROM employees;  -- refers to company_db.employees

-- Without USE, need full qualification:
SELECT * FROM company_db.employees;

-- Cross-database query (MySQL)
SELECT e.Name, d.DeptName
FROM company_db.employees e
JOIN hr_db.departments d ON e.dept_id = d.dept_id;

-- PostgreSQL: connect to a database
\c company_db   -- in psql CLI

-- Check current database
SELECT DATABASE();          -- MySQL
SELECT CURRENT_DATABASE();  -- PostgreSQL
SELECT DB_NAME();           -- SQL Server`
  },

  "SHOW TABLES": {
    explanation: "SHOW TABLES lists all tables in the currently active database. Used to explore database structure when working with an unfamiliar schema.",
    details: [
      "MySQL: SHOW TABLES; or SHOW FULL TABLES; (shows table type: BASE TABLE vs VIEW)",
      "PostgreSQL: \\dt or SELECT tablename FROM pg_tables WHERE schemaname='public';",
      "SQL Server: SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES;",
      "SHOW TABLES LIKE 'pattern': filter by name",
      "SHOW TABLES FROM database_name: list tables from a specific database without switching to it",
      "INFORMATION_SCHEMA.TABLES is portable across most databases"
    ],
    example: `-- MySQL: show all tables in active database
SHOW TABLES;

-- Show table type (BASE TABLE or VIEW)
SHOW FULL TABLES;
-- Result:
-- +------------------+------------+
-- | Tables_in_co_db  | Table_type |
-- +------------------+------------+
-- | customers        | BASE TABLE |
-- | employees        | BASE TABLE |
-- | sales_summary    | VIEW       |
-- +------------------+------------+

-- Filter by pattern
SHOW TABLES LIKE 'emp%';

-- From a specific database
SHOW TABLES FROM hr_db;

-- Portable via INFORMATION_SCHEMA
SELECT TABLE_NAME, TABLE_TYPE
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'company_db'
ORDER BY TABLE_NAME;`
  },

  "DESCRIBE TABLE": {
    explanation: "DESCRIBE (or DESC) shows the structure of a table — its columns, data types, nullability, keys, defaults, and extra properties. Essential for understanding a table before writing queries.",
    details: [
      "MySQL: DESCRIBE table_name; or DESC table_name; (shorthand)",
      "Shows: Field name, Type, Null (YES/NO), Key (PRI/UNI/MUL), Default, Extra (e.g. auto_increment)",
      "PostgreSQL: \\d table_name in psql CLI",
      "SQL Server: sp_help 'table_name'; or use INFORMATION_SCHEMA.COLUMNS",
      "SHOW CREATE TABLE: shows the full CREATE TABLE statement as-executed",
      "INFORMATION_SCHEMA.COLUMNS: portable across all databases"
    ],
    example: `-- MySQL: describe table structure
DESCRIBE employees;
-- or shorthand:
DESC employees;

-- Result:
-- +------------+--------------+------+-----+-------------------+----------------+
-- | Field      | Type         | Null | Key | Default           | Extra          |
-- +------------+--------------+------+-----+-------------------+----------------+
-- | emp_id     | int          | NO   | PRI | NULL              | auto_increment |
-- | name       | varchar(100) | NO   |     | NULL              |                |
-- | salary     | decimal(10,2)| YES  |     | NULL              |                |
-- | hire_date  | timestamp    | YES  |     | CURRENT_TIMESTAMP |                |
-- +------------+--------------+------+-----+-------------------+----------------+

-- Full CREATE TABLE statement
SHOW CREATE TABLE employees;

-- Portable: INFORMATION_SCHEMA
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT, EXTRA
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'company_db' AND TABLE_NAME = 'employees'
ORDER BY ORDINAL_POSITION;

-- PostgreSQL
\d employees  -- in psql CLI`
  },

  "CREATE TABLE": {
    explanation: "CREATE TABLE defines a new table with its columns, data types, constraints, and properties. It's one of the most important DDL statements — good table design upfront saves enormous pain later.",
    details: [
      "Columns defined as: column_name data_type [constraints]",
      "Column-level constraints: NOT NULL, UNIQUE, PRIMARY KEY, DEFAULT, CHECK, REFERENCES",
      "Table-level constraints: PRIMARY KEY(col1,col2), FOREIGN KEY, UNIQUE(col), CHECK(expression)",
      "AUTO_INCREMENT (MySQL) / SERIAL (PostgreSQL) / IDENTITY (SQL Server) for auto-generated IDs",
      "CREATE TABLE IF NOT EXISTS: safe to re-run without error",
      "CREATE TABLE AS SELECT: creates table from query result (copies structure + data)",
      "CREATE TABLE LIKE other_table: copies structure only (MySQL)",
      "Engine/Storage: MySQL supports InnoDB (default, transactions) and MyISAM (no transactions)"
    ],
    example: `-- Full CREATE TABLE with common patterns
CREATE TABLE orders (
    order_id     INT           PRIMARY KEY AUTO_INCREMENT,
    customer_id  INT           NOT NULL,
    order_date   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12,2) NOT NULL CHECK (total_amount >= 0),
    status       VARCHAR(20)   DEFAULT 'pending',
    notes        TEXT,

    -- Table-level foreign key constraint
    CONSTRAINT fk_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    -- Table-level check constraint
    CONSTRAINT chk_status
        CHECK (status IN ('pending','processing','shipped','delivered','cancelled'))
);

-- CREATE TABLE from query (snapshot/archive)
CREATE TABLE employees_2024 AS
SELECT * FROM employees WHERE YEAR(hire_date) <= 2024;

-- CREATE TABLE like another (copy structure only)
CREATE TABLE employees_backup LIKE employees;`
  },

  "ALTER TABLE": {
    explanation: "ALTER TABLE modifies an existing table's structure without losing its data. Used to add/remove/modify columns, add/drop constraints, rename columns or the table itself.",
    details: [
      "ADD COLUMN: Add a new column (appended at end by default; use AFTER col_name for position)",
      "DROP COLUMN: Remove a column permanently — all its data is lost!",
      "MODIFY COLUMN (MySQL) / ALTER COLUMN (SQL Server/PostgreSQL): Change data type or constraints",
      "RENAME COLUMN: Change a column's name (MySQL 8+, PostgreSQL, SQL Server 2022+)",
      "ADD CONSTRAINT / DROP CONSTRAINT: Add or remove constraints",
      "RENAME TO: Rename the table itself",
      "ALTER TABLE can be slow on large tables — it may lock the table while running",
      "Online DDL (MySQL InnoDB): some ALTER operations run without blocking reads/writes"
    ],
    example: `-- Add columns
ALTER TABLE employees
    ADD COLUMN email       VARCHAR(200) UNIQUE,
    ADD COLUMN department  VARCHAR(100) DEFAULT 'General' AFTER name;

-- Modify column type (MySQL)
ALTER TABLE employees
    MODIFY COLUMN name VARCHAR(200) NOT NULL;

-- PostgreSQL change type
ALTER TABLE employees
    ALTER COLUMN salary TYPE NUMERIC(15,2);

-- Rename column (MySQL 8+)
ALTER TABLE employees
    RENAME COLUMN dept TO department;

-- Drop column
ALTER TABLE employees DROP COLUMN old_field;

-- Add/Drop constraints
ALTER TABLE employees
    ADD CONSTRAINT uq_email UNIQUE (email);
ALTER TABLE employees
    DROP INDEX uq_email;  -- MySQL drops unique constraint via index name

-- Add foreign key
ALTER TABLE orders
    ADD CONSTRAINT fk_cust FOREIGN KEY (cust_id) REFERENCES customers(id);

-- Rename table
ALTER TABLE employees RENAME TO staff;`
  },

  "DROP TABLE": {
    explanation: "DROP TABLE permanently removes a table — its structure AND all its data — from the database. This is an irreversible DDL operation. If other tables have foreign keys pointing to this table, you must drop those first or use CASCADE.",
    details: [
      "Syntax: DROP TABLE table_name;",
      "IF EXISTS: Prevents error if table doesn't exist — always use this in scripts",
      "CASCADE: Automatically drops dependent objects (views, foreign keys) — PostgreSQL",
      "RESTRICT: Default — fails if dependent objects exist",
      "In MySQL: foreign key constraints must be disabled or child tables dropped first",
      "DROP TABLE vs TRUNCATE: DROP removes structure too; TRUNCATE keeps structure",
      "DROP TABLE vs DELETE: DROP removes everything; DELETE removes rows with optional WHERE",
      "Cannot be rolled back in MySQL (DDL auto-commits)"
    ],
    example: `-- Basic drop
DROP TABLE employees;

-- Safe drop (no error if not exists)
DROP TABLE IF EXISTS employees;

-- Drop multiple tables
DROP TABLE IF EXISTS order_items, orders, customers;

-- PostgreSQL: drop with dependencies
DROP TABLE departments CASCADE;  -- also drops views/FKs referencing it

-- MySQL: must disable foreign key checks to drop referenced table
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE departments;
SET FOREIGN_KEY_CHECKS = 1;

-- Drop and recreate (reset table):
DROP TABLE IF EXISTS temp_results;
CREATE TABLE temp_results (id INT, value DECIMAL(10,2));

-- What gets deleted:
-- ✓ All rows of data
-- ✓ Table structure (columns, types)
-- ✓ Indexes on the table
-- ✓ Triggers on the table
-- ✗ Stored procedures that reference it (they just break)`
  },

  "RENAME TABLE": {
    explanation: "RENAME TABLE changes the name of an existing table. This is a DDL operation that only renames the object — all data, indexes, and constraints remain intact.",
    details: [
      "MySQL: RENAME TABLE old_name TO new_name;",
      "MySQL: Can rename multiple tables atomically in one statement",
      "PostgreSQL: ALTER TABLE old_name RENAME TO new_name;",
      "SQL Server: sp_rename 'old_name', 'new_name';",
      "All views, stored procedures, and foreign keys referencing the old name will break!",
      "Use to: swap a new table in place of an old one (blue-green deployment pattern)",
      "Renaming is fast — it just updates the metadata, not the data"
    ],
    example: `-- MySQL: rename single table
RENAME TABLE employees TO staff;

-- MySQL: rename multiple tables atomically (swap trick!)
-- Useful for zero-downtime table replacement:
RENAME TABLE employees TO employees_old,
             employees_new TO employees;

-- PostgreSQL
ALTER TABLE employees RENAME TO staff;

-- SQL Server
EXEC sp_rename 'employees', 'staff';

-- After renaming: update dependent objects!
-- Views referencing 'employees' will now fail:
-- Error: Table 'employees' doesn't exist
-- You must recreate or alter the views to use new name

-- Check for dependent views/procedures before renaming:
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.VIEWS
WHERE VIEW_DEFINITION LIKE '%employees%';`
  },

  "SQL Constraints": {
    explanation: "Constraints are rules enforced on table columns to maintain data integrity, accuracy, and reliability. They prevent invalid data from being entered into the database. Constraints can be defined at column level or table level.",
    details: [
      "NOT NULL: Column cannot store NULL values",
      "UNIQUE: All values in column must be distinct (NULLs are allowed — multiple NULLs OK in most DBs)",
      "PRIMARY KEY: Uniquely identifies each row; NOT NULL + UNIQUE; one per table",
      "FOREIGN KEY: Enforces referential integrity between tables",
      "CHECK: Validates that values meet a specified condition/expression",
      "DEFAULT: Provides a default value when no value is specified during INSERT",
      "AUTO_INCREMENT: Automatically generates sequential integers (MySQL); SERIAL in PostgreSQL",
      "Constraints can be named (CONSTRAINT name ...) for easier reference when dropping/altering"
    ],
    example: `CREATE TABLE employees (
    emp_id     INT            NOT NULL AUTO_INCREMENT,  -- NOT NULL + auto
    emp_code   VARCHAR(10)    NOT NULL UNIQUE,          -- must be unique
    name       VARCHAR(100)   NOT NULL,
    dept_id    INT            NOT NULL,
    salary     DECIMAL(10,2)  DEFAULT 30000.00,         -- default value
    hire_date  DATE           DEFAULT (CURRENT_DATE),
    age        INT            CHECK (age >= 18),         -- check constraint

    -- Table-level constraints (preferred for compound constraints)
    PRIMARY KEY (emp_id),

    CONSTRAINT fk_dept
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
        ON DELETE RESTRICT ON UPDATE CASCADE,

    CONSTRAINT chk_salary
        CHECK (salary BETWEEN 10000 AND 500000)
);

-- Violation examples:
INSERT INTO employees (emp_code, name) VALUES ('E001', NULL);
-- ERROR: Column 'name' cannot be null (NOT NULL violated)

INSERT INTO employees (emp_code, name, dept_id) VALUES ('E001', 'Alice', 99);
-- ERROR: Foreign key constraint fails (dept 99 doesn't exist)`
  },

  "SQL Keys": {
    explanation: "Keys are special constraints that identify rows uniquely or establish relationships between tables. Understanding keys is foundational to proper relational database design.",
    details: [
      "Super Key: Any set of columns that uniquely identifies a row (may have extra columns)",
      "Candidate Key: Minimal super key — no column can be removed and still maintain uniqueness",
      "Primary Key: The chosen candidate key for the table — NOT NULL, UNIQUE, one per table",
      "Alternate Key: Candidate keys NOT chosen as primary key (they become UNIQUE constraints)",
      "Foreign Key: Column(s) in one table that reference the PRIMARY KEY of another table",
      "Composite Key: A key made of two or more columns (used when no single column is unique)",
      "Surrogate Key: An artificial key (auto-increment ID) with no business meaning — most common",
      "Natural Key: A key with real-world business meaning (e.g., SSN, email, ISBN)"
    ],
    example: `-- Table: students
-- Columns: student_id, ssn, email, name, phone

-- Super Keys: {student_id}, {ssn}, {email}, {student_id, ssn}, {student_id, name}, ...
-- Candidate Keys: {student_id}, {ssn}, {email}  -- each uniquely identifies a row
-- Primary Key: {student_id}  -- chosen candidate key
-- Alternate Keys: {ssn}, {email}  -- other candidate keys

CREATE TABLE students (
    student_id INT        PRIMARY KEY AUTO_INCREMENT,  -- surrogate PK
    ssn        CHAR(11)   UNIQUE NOT NULL,             -- alternate key
    email      VARCHAR(150) UNIQUE NOT NULL,            -- alternate key
    name       VARCHAR(100) NOT NULL,
    phone      VARCHAR(15)
);

-- Foreign Key example
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id    INT NOT NULL,
    course_id     INT NOT NULL,

    -- Composite key (student can't enroll in same course twice)
    UNIQUE (student_id, course_id),

    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id)  REFERENCES courses(course_id)
);`
  }
};

export default {
  "SQL Basics": {
    topics: sqlBasics
  }
};