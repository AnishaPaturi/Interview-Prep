const dbmsData = {
  "DBMS": {
    icon: "ti-database",
    color: "#0F6E56",
    topics: {
      "DBMS Basics": {
        explanation: "A Database Management System (DBMS) is software that manages databases. It provides an interface between users and databases for storing, retrieving, and managing data efficiently and securely.",
        details: [
          "Components: Data, DBMS software, Users, Applications",
          "Types: Hierarchical, Network, Relational (RDBMS), Object-oriented, NoSQL",
          "DBMS vs File system: data redundancy control, integrity, concurrent access, security",
          "3-level architecture: External, Conceptual, Internal (ANSI/SPARC)"
        ],
        example: `// Database languages
DDL (Data Definition Language):   CREATE, ALTER, DROP
DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE
DCL (Data Control Language):      GRANT, REVOKE
TCL (Transaction Control):        COMMIT, ROLLBACK, SAVEPOINT`
      },
      "ER Model": {
        explanation: "The Entity-Relationship (ER) model is a conceptual data model representing real-world objects (entities), their properties (attributes), and relationships between them.",
        details: [
          "Entity: real-world object with independent existence (Student, Course)",
          "Attribute: property of entity (name, age, ID)",
          "Relationship: association between entities (Student ENROLLS Course)",
          "Cardinality: 1:1, 1:N, M:N"
        ],
        example: `// Attribute types
Simple:      cannot be divided (Age, ID)
Composite:   can be divided (FullName → First + Last)
Derived:     calculated from others (Age from DOB)
Multi-valued: multiple values (PhoneNumbers: {111,222})
Key:         uniquely identifies entity (StudentID)

// Cardinality: Student ─── ENROLLS ─── Course (M:N)
// A student can enroll in many courses
// A course can have many students`
      },
      "Primary Key": {
        explanation: "A primary key is a column (or set of columns) that uniquely identifies each row in a table. It must be unique and NOT NULL.",
        details: [
          "Must be unique for every row",
          "Cannot contain NULL values",
          "Only one primary key per table",
          "Can be a single or composite column"
        ],
        example: `-- Single column primary key
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50),
    Age INT
);

-- Composite primary key
CREATE TABLE Enrollment (
    StudentID INT,
    CourseID  INT,
    PRIMARY KEY (StudentID, CourseID)
);

INSERT INTO Students VALUES (101, 'Alice', 20);
INSERT INTO Students VALUES (101, 'Bob',   21);
-- ERROR: duplicate primary key (101)!`
      },
      "Foreign Key": {
        explanation: "A foreign key is a column in one table that refers to the primary key of another table. It enforces referential integrity — ensuring linked data is consistent.",
        details: [
          "Establishes link between two tables",
          "Value must exist in the referenced table (or be NULL)",
          "ON DELETE CASCADE: delete child rows when parent deleted",
          "ON UPDATE CASCADE: update child rows when parent key updated"
        ],
        example: `CREATE TABLE Department (
    DeptID   INT PRIMARY KEY,
    DeptName VARCHAR(50)
);

CREATE TABLE Employee (
    EmpID  INT PRIMARY KEY,
    Name   VARCHAR(50),
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
    ON DELETE SET NULL ON UPDATE CASCADE
);

-- Valid: DeptID 10 exists in Department
INSERT INTO Employee VALUES (1, 'Alice', 10);

-- Invalid: DeptID 99 doesn't exist
INSERT INTO Employee VALUES (2, 'Bob', 99); -- ERROR!`
      },
      "Normalization": {
        explanation: "Normalization organizes a database to reduce data redundancy and improve data integrity by decomposing tables according to normal form rules.",
        details: [
          "Goal: eliminate insertion, update, deletion anomalies",
          "1NF → 2NF → 3NF → BCNF (increasing strictness)",
          "Functional dependency: A → B (knowing A determines B)"
        ],
        example: `// Update anomaly: changing Prof.Smith's name
// requires updates in many rows

// Deletion anomaly: deleting last student in CS1
// loses all info about CS1

// Solution: normalize into separate tables
// Student(SID, SName)
// Course(CID, CName, InstructorID)
// Instructor(InstructorID, InstructorName)
// Enrollment(SID, CID, Grade)`
      },
      "1NF": {
        explanation: "First Normal Form: A table is in 1NF if all column values are atomic (indivisible), there are no repeating groups, and each row is unique.",
        details: [
          "No multi-valued attributes",
          "No composite attributes",
          "Each column must have a single value",
          "Each row must be unique (has a primary key)"
        ],
        example: `// NOT in 1NF (multi-valued)
Student: SID | Name  | Courses
         101 | Alice | CS1, CS2, CS3  ← violation!

// Convert to 1NF
Student_Course: SID | Name  | Course
                101 | Alice | CS1
                101 | Alice | CS2
                101 | Alice | CS3`
      },
      "2NF": {
        explanation: "Second Normal Form: A table is in 2NF if it is in 1NF and every non-key attribute is fully functionally dependent on the entire primary key (no partial dependencies).",
        details: [
          "Only applies to tables with composite primary keys",
          "Partial dependency: non-key attribute depends on PART of composite key",
          "Solution: move partially dependent columns to a separate table"
        ],
        example: `// PK = (OrderID, ProductID)
// ProductID → ProductName  ← partial dep!
// OrderID   → OrderDate    ← partial dep!

// Convert to 2NF:
Order(OrderID, OrderDate)
Product(ProductID, ProductName)
Order_Item(OrderID, ProductID, Qty)  ← only full deps`
      },
      "3NF": {
        explanation: "Third Normal Form: A table is in 3NF if it is in 2NF and no non-key attribute is transitively dependent on the primary key.",
        details: [
          "Transitive dependency: PK → non-key B → non-key C",
          "Solution: move transitive dependencies to a new table",
          "'Non-key attributes depend on the key, the whole key, and nothing but the key'"
        ],
        example: `// EmpID → DeptID → DeptName (transitive!)
Employee(EmpID, EmpName, DeptID, DeptName)

// Convert to 3NF:
Employee(EmpID, EmpName, DeptID)
Department(DeptID, DeptName)`
      },
      "BCNF": {
        explanation: "Boyce-Codd Normal Form is a stronger version of 3NF. A table is in BCNF if for every functional dependency X → Y, X must be a superkey.",
        details: [
          "Every determinant must be a candidate key",
          "Stricter than 3NF — handles anomalies 3NF misses",
          "BCNF decomposition may not always preserve all FDs"
        ],
        example: `// In 3NF but NOT BCNF:
Student_Advisor(StudentID, Subject, Advisor)
FD: Advisor → Subject  (Advisor is NOT a superkey!)

// Convert to BCNF:
Advisor_Subject(Advisor, Subject)
Student_Advisor(StudentID, Advisor)`
      },
      "ACID Properties": {
        explanation: "ACID properties guarantee that database transactions are processed reliably: Atomicity, Consistency, Isolation, and Durability.",
        details: [
          "Atomicity: transaction is all-or-nothing",
          "Consistency: transaction brings DB from one valid state to another",
          "Isolation: concurrent transactions don't interfere with each other",
          "Durability: committed transactions survive system failures"
        ],
        example: `BEGIN TRANSACTION;
    UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
    UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;

// Atomicity:    if second UPDATE fails → ROLLBACK both
// Consistency:  total money unchanged
// Isolation:    another txn can't see partial state
// Durability:   after COMMIT, data persists through crash`
      },
      "Transactions": {
        explanation: "A transaction is a sequence of database operations treated as a single logical unit of work. It either completes fully (commit) or is entirely undone (rollback).",
        details: [
          "BEGIN/START TRANSACTION: marks start",
          "COMMIT: makes changes permanent",
          "ROLLBACK: undoes all changes since BEGIN",
          "SAVEPOINT: partial rollback point"
        ],
        example: `BEGIN;
    UPDATE a SET x = 1;
    SAVEPOINT sp1;
    UPDATE b SET y = 2;
    ROLLBACK TO sp1;  -- undo b, keep a
COMMIT;

-- Isolation levels
READ UNCOMMITTED → dirty reads possible
READ COMMITTED   → prevents dirty reads
REPEATABLE READ  → prevents non-repeatable reads
SERIALIZABLE     → strictest, prevents phantom reads`
      },
      "Joins": {
        explanation: "SQL JOINs combine rows from two or more tables based on a related column. Essential for querying relational data spread across multiple tables.",
        details: [
          "INNER JOIN: only matching rows from both tables",
          "LEFT JOIN: all rows from left table + matching from right",
          "RIGHT JOIN: all rows from right table + matching from left",
          "FULL JOIN: all rows from both tables",
          "SELF JOIN: table joined with itself"
        ],
        example: `-- INNER JOIN: only students with departments
SELECT s.Name, d.DeptName
FROM Students s INNER JOIN Department d ON s.DeptID = d.DeptID;

-- LEFT JOIN: all students (even without dept)
SELECT s.Name, d.DeptName
FROM Students s LEFT JOIN Department d ON s.DeptID = d.DeptID;
-- Students with no dept → DeptName = NULL

-- SELF JOIN: employees and their managers
SELECT e.Name AS Employee, m.Name AS Manager
FROM Employee e LEFT JOIN Employee m ON e.ManagerID = m.EmpID;`
      },
      "Indexing": {
        explanation: "An index is a data structure (typically B-tree) that improves data retrieval speed by providing fast lookup — like a book's index.",
        details: [
          "Clustered index: data rows sorted by index key (one per table)",
          "Non-clustered index: separate structure pointing to data rows",
          "Composite index: index on multiple columns",
          "Trade-off: faster reads, slower writes (index must be maintained)"
        ],
        example: `-- Without index: full table scan O(n)
SELECT * FROM Students WHERE Name = 'Alice';

-- Create index: O(log n) lookup
CREATE INDEX idx_name ON Students(Name);

-- Unique index
CREATE UNIQUE INDEX idx_email ON Users(Email);

-- Composite index
CREATE INDEX idx_dept_age ON Employee(DeptID, Age);

-- Explain plan (check index usage)
EXPLAIN SELECT * FROM Students WHERE Name = 'Alice';`
      },
      "Aggregate Functions": {
        explanation: "Aggregate functions perform calculations on a set of rows and return a single value. Used with SELECT to summarize data, and with GROUP BY to aggregate per group.",
        details: [
          "COUNT: number of rows",
          "SUM: total of values",
          "AVG: average value",
          "MIN/MAX: smallest/largest value",
          "HAVING: filter groups (like WHERE but for aggregates)"
        ],
        example: `SELECT DeptID,
       COUNT(*)    AS EmpCount,
       AVG(Salary) AS AvgSal,
       MAX(Salary) AS MaxSal
FROM Employees
GROUP BY DeptID
HAVING AVG(Salary) > 50000;  -- only high-paying depts`
      }
    }
  }
};

export default dbmsData;
