
const dbmsData = {
  "DBMS": {
    icon: "ti-database",
    color: "#0F6E56",
    topics: {
      "DBMS Basics": {
        explanation: "A Database Management System (DBMS) is software that manages databases, providing controlled access to persistent data. It abstracts raw file storage into tables, queries, and transactions. DBMS handles concurrency (multiple users simultaneously), data integrity, security, and recovery. Understanding the architecture and core concepts is fundamental for backend and full-stack interviews.",
        details: [
          "DBMS advantages over file systems: no redundancy, data integrity, concurrent access control, security, ACID",
          "3-level architecture (ANSI/SPARC): External (user views), Conceptual (logical schema), Internal (physical storage)",
          "DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE — define schema",
          "DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE — manipulate data",
          "DCL (Data Control Language): GRANT, REVOKE — manage permissions",
          "TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT — manage transactions",
          "Relational DBMS: data in tables with rows and columns; relationships via keys (MySQL, PostgreSQL, Oracle)",
          "NoSQL: non-relational — document (MongoDB), key-value (Redis), column (Cassandra), graph (Neo4j)"
        ],
        example: `// DDL: defining structure
CREATE TABLE Employees (
    EmpID    INT PRIMARY KEY AUTO_INCREMENT,
    Name     VARCHAR(100) NOT NULL,
    Email    VARCHAR(150) UNIQUE NOT NULL,
    Salary   DECIMAL(10,2) DEFAULT 50000,
    DeptID   INT,
    HireDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);
ALTER TABLE Employees ADD COLUMN Phone VARCHAR(20);
DROP TABLE TempTable;

// DML: manipulating data
INSERT INTO Employees (Name, Email, Salary, DeptID) VALUES ('Alice', 'alice@co.com', 80000, 1);
UPDATE Employees SET Salary = Salary * 1.10 WHERE DeptID = 1;
DELETE FROM Employees WHERE EmpID = 5;

// Transaction (TCL)
START TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 500 WHERE AccID = 1;
    UPDATE Accounts SET Balance = Balance + 500 WHERE AccID = 2;
COMMIT;   -- both updates permanent
-- If error: ROLLBACK; -- undo both updates`
      },
      "ACID Properties": {
        explanation: "ACID (Atomicity, Consistency, Isolation, Durability) is the set of properties that guarantee database transactions are processed reliably. These properties are what distinguish a proper DBMS from simple file storage. Every transaction must satisfy all four ACID properties to maintain database integrity.",
        details: [
          "Atomicity: all operations in a transaction succeed or ALL are rolled back — 'all or nothing'",
          "Consistency: transaction brings database from one valid state to another — constraints always satisfied",
          "Isolation: concurrent transactions execute as if they were sequential — intermediate states invisible to others",
          "Durability: committed transaction persists even after system crash — written to disk/WAL",
          "Isolation levels (weakest to strongest): Read Uncommitted, Read Committed, Repeatable Read, Serializable",
          "Read Uncommitted: can read dirty data (uncommitted changes from other transactions)",
          "Read Committed: only see committed data; but non-repeatable reads possible",
          "Repeatable Read: same SELECT returns same rows; but phantom reads possible (MySQL InnoDB default)",
          "Serializable: fully isolated; highest correctness but lowest concurrency"
        ],
        example: `// Atomicity example: bank transfer
START TRANSACTION;
    UPDATE Accounts SET Balance = Balance - 1000 WHERE AccID = 1;
    -- Crash here? Both operations rolled back → no money lost
    UPDATE Accounts SET Balance = Balance + 1000 WHERE AccID = 2;
COMMIT;

// Isolation anomalies and which level prevents them:
Dirty Read:         read uncommitted data from another transaction
Non-repeatable Read: re-reading row gets different value (another tx committed)
Phantom Read:       re-running query returns different rows (another tx inserted)

Level              Dirty  Non-rep  Phantom
Read Uncommitted:    ✓      ✓        ✓   (all allowed)
Read Committed:      ✗      ✓        ✓
Repeatable Read:     ✗      ✗        ✓
Serializable:        ✗      ✗        ✗   (none allowed)

// Durability: WAL (Write-Ahead Log)
// Before modifying data pages, write changes to log first
// On crash: replay WAL to reconstruct committed transactions
// Ensures committed data is never lost

// Transaction isolation in Java JDBC
connection.setAutoCommit(false);
connection.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
try {
    // operations...
    connection.commit();
} catch (Exception e) {
    connection.rollback();
}`
      },
      "Normalization": {
        explanation: "Normalization is the process of structuring a relational database to reduce data redundancy and improve data integrity. It decomposes tables into smaller ones according to normal form rules. Each normal form eliminates specific types of anomalies (update anomaly, insertion anomaly, deletion anomaly). 3NF or BCNF is the target for most production databases.",
        details: [
          "Functional Dependency: A → B means knowing A uniquely determines B (like Primary Key → all other columns)",
          "1NF: atomic values only (no repeating groups, no multi-valued attributes in single column)",
          "2NF: 1NF + no partial dependency (non-key attribute must depend on ENTIRE composite primary key)",
          "3NF: 2NF + no transitive dependency (non-key attribute must NOT depend on another non-key attribute)",
          "BCNF (Boyce-Codd NF): stricter than 3NF — for every FD X→Y, X must be a superkey",
          "Update anomaly: changing a value requires updates in many rows (redundancy)",
          "Insertion anomaly: can't insert data without related data existing",
          "Deletion anomaly: deleting a row inadvertently deletes other important data",
          "Denormalization: intentionally introduce redundancy for performance (fewer JOINs)"
        ],
        example: `// Un-normalized table (0NF violation)
Orders: OrderID, CustomerName, CustomerEmail, Products[multiple values!]

// 1NF: Atomic values, unique rows
OrderID  CustomerName  CustomerEmail    ProductID
1        Alice         a@co.com         P1
1        Alice         a@co.com         P2
2        Bob           b@co.com         P1

// Still has anomalies: update Alice's email → update multiple rows

// 2NF: Remove partial dependencies (assume PK = OrderID+ProductID)
// CustomerName, CustomerEmail depend only on OrderID (not full composite PK) → move out
Orders(OrderID, CustomerName, CustomerEmail)   // PK: OrderID
OrderItems(OrderID, ProductID)                 // PK: OrderID+ProductID

// 3NF: Remove transitive dependencies
// Suppose: OrderID → CustomerID → CustomerEmail (transitive!)
Orders(OrderID, CustomerID)           // PK: OrderID
Customers(CustomerID, Name, Email)    // PK: CustomerID
OrderItems(OrderID, ProductID)

// BCNF example: FD must have superkey on left side
// If Course, Teacher → Room AND Room → Course (Room determines Course)
// Then Room is not a superkey but Room→Course exists → violates BCNF
// Split: RoomCourse(Room, Course), TeacherRoom(Teacher, Room)`
      },
      "Joins": {
        explanation: "A JOIN combines rows from two or more tables based on a related column. Joins are central to relational databases and are a critical interview topic. Understanding when to use each type of join and being able to write correct join queries is essential for any backend or data engineering role.",
        details: [
          "INNER JOIN: returns rows where match exists in BOTH tables",
          "LEFT JOIN: returns ALL rows from left table + matching rows from right (NULL for non-matches)",
          "RIGHT JOIN: returns ALL rows from right table + matching rows from left",
          "FULL OUTER JOIN: returns ALL rows from both tables; NULLs where no match",
          "CROSS JOIN: Cartesian product — every row from A with every row from B; O(m×n) rows",
          "SELF JOIN: join a table to itself — used for hierarchical data (employee→manager)",
          "JOIN performance: index the join columns; smaller table drives the join (nested loop)",
          "Multiple JOINs: each JOIN adds one more table; execution is left-to-right unless optimizer reorders"
        ],
        example: `-- Setup
Employees: EmpID, Name, DeptID, ManagerID, Salary
Department: DeptID, DeptName, Budget

-- INNER JOIN: employees with their department name
SELECT e.Name, d.DeptName
FROM Employees e
INNER JOIN Department d ON e.DeptID = d.DeptID;
-- Only employees who have a matching DeptID in Department

-- LEFT JOIN: all employees (even those without a department)
SELECT e.Name, COALESCE(d.DeptName, 'No Department') AS Dept
FROM Employees e
LEFT JOIN Department d ON e.DeptID = d.DeptID;
-- NULL DeptName → employee has no department

-- FULL OUTER JOIN: all employees + all departments
SELECT e.Name, d.DeptName
FROM Employees e
FULL OUTER JOIN Department d ON e.DeptID = d.DeptID;
-- Shows employees with no dept AND departments with no employees

-- SELF JOIN: employee with their manager's name
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employees e
LEFT JOIN Employees m ON e.ManagerID = m.EmpID;

-- Multiple JOINs
SELECT e.Name, d.DeptName, p.ProjectName
FROM Employees e
JOIN Department d  ON e.DeptID = d.DeptID
JOIN EmpProject ep ON e.EmpID = ep.EmpID
JOIN Projects p    ON ep.ProjectID = p.ProjectID
WHERE d.DeptName = 'Engineering';`
      },
      "Indexes": {
        explanation: "An index is a data structure (usually a B-tree or hash) that speeds up data retrieval at the cost of additional storage and slower writes. Indexes are the primary tool for query optimization. Knowing when to add indexes, what types exist, and their trade-offs is critical for any database interview.",
        details: [
          "B-tree index: balanced tree; O(log n) lookup, range queries work (BETWEEN, <, >)",
          "Hash index: O(1) exact match only; doesn't support range queries (used in memory engines)",
          "Clustered index: data rows physically ordered by index key (one per table); in MySQL InnoDB, PK is clustered",
          "Non-clustered index: separate structure with pointers to data rows; multiple per table",
          "Composite index: index on multiple columns; useful for multi-column WHERE/ORDER BY",
          "Covering index: index contains all columns needed by query — no table lookup required",
          "Cardinality: number of distinct values; high cardinality → index is more selective/useful",
          "Index overhead: slows INSERT/UPDATE/DELETE (must update index); extra disk space"
        ],
        example: `-- Create indexes
CREATE INDEX idx_emp_dept ON Employees(DeptID);         -- single column
CREATE INDEX idx_emp_name_dept ON Employees(DeptID, Name); -- composite
CREATE UNIQUE INDEX idx_emp_email ON Employees(Email);  -- unique

-- EXPLAIN: analyze query execution
EXPLAIN SELECT * FROM Employees WHERE DeptID = 5;
-- Shows: type (ALL=full scan vs ref=index lookup), rows scanned, key used

-- When index HELPS:
SELECT * FROM Employees WHERE DeptID = 5;          -- exact match
SELECT * FROM Employees WHERE Salary BETWEEN 50000 AND 80000; -- range
SELECT * FROM Employees ORDER BY DeptID, Name;     -- sort

-- When index DOESN'T help (index skipped):
SELECT * FROM Employees WHERE YEAR(HireDate) = 2023;  -- function on column
SELECT * FROM Employees WHERE Name LIKE '%alice%';    -- leading wildcard
SELECT * FROM Employees WHERE DeptID != 5;            -- low selectivity NOT

-- Composite index rule: leftmost prefix
-- Index on (DeptID, Name, Salary):
-- Works: WHERE DeptID=1
-- Works: WHERE DeptID=1 AND Name='Alice'
-- Works: WHERE DeptID=1 AND Name='Alice' AND Salary>50000
-- Skip: WHERE Name='Alice' (not leftmost)`
      },
      "Transactions & Concurrency": {
        explanation: "When multiple users access a database simultaneously, transactions must be isolated to prevent data corruption. The database uses locking protocols or MVCC (Multi-Version Concurrency Control) to manage this. Understanding concurrency control mechanisms is essential for database and backend interviews.",
        details: [
          "Concurrency problems: dirty read, non-repeatable read, phantom read, lost update",
          "Pessimistic locking: lock data before reading/writing; prevents conflicts but reduces concurrency",
          "Optimistic locking: no lock during read; at write time, check if data was modified → retry if yes",
          "2PL (Two-Phase Locking): growing phase (only acquire locks) then shrinking phase (only release)",
          "Strict 2PL: release all locks only at commit/rollback → guarantees serializability",
          "MVCC (Multi-Version Concurrency Control): each transaction sees a snapshot; reads don't block writes",
          "PostgreSQL uses MVCC; MySQL InnoDB uses MVCC for reads and locking for writes",
          "Deadlock detection: cycle in wait-for graph; victim selection + rollback"
        ],
        example: `-- Lost Update problem (without proper isolation)
T1: READ balance = 1000;      T2: READ balance = 1000;
T1: balance = 1000 - 100;     T2: balance = 1000 + 200;
T1: WRITE balance = 900;      T2: WRITE balance = 1200; ← T1's update LOST!
-- Correct result should be 1100

-- Pessimistic locking: SELECT ... FOR UPDATE
START TRANSACTION;
SELECT balance FROM Accounts WHERE id=1 FOR UPDATE; -- locks row
UPDATE Accounts SET balance = balance - 100 WHERE id=1;
COMMIT;

-- Optimistic locking: use version column
CREATE TABLE Accounts (id INT, balance DECIMAL, version INT);
-- Read: version = 5
-- Update: WHERE version = 5 → if another tx changed it, rowCount=0 → retry
UPDATE Accounts SET balance=900, version=6 WHERE id=1 AND version=5;

-- MVCC: how PostgreSQL reads work
-- Each row has xmin (created by tx) and xmax (deleted by tx)
-- Transaction snapshot: visible if xmin committed before snapshot AND xmax null/not committed
-- Readers never block writers; writers never block readers

-- Deadlock example
T1: LOCK row A; wait for row B
T2: LOCK row B; wait for row A
-- Database detects cycle, rolls back T2, T1 continues`
      }
    }
  }
};

export default dbmsData;
