const sqlData = {
  "SQL": {
    icon: "ti-table",
    color: "#3B6D11",
    topics: {
      "SELECT": {
        explanation: "SELECT is the most fundamental SQL command used to retrieve data from one or more tables. It can filter, sort, join, and aggregate data.",
        details: [
          "SELECT *: all columns; SELECT col1, col2: specific columns",
          "Aliases: AS keyword for column/table names",
          "DISTINCT: remove duplicate rows",
          "Order of clauses: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY"
        ],
        example: `SELECT d.DeptName, COUNT(e.EmpID) AS Headcount, AVG(e.Salary) AS AvgPay
FROM Employees e
JOIN Department d ON e.DeptID = d.DeptID
WHERE e.Salary > 30000
GROUP BY d.DeptName
HAVING COUNT(e.EmpID) > 5
ORDER BY AvgPay DESC
LIMIT 10;`
      },
      "WHERE": {
        explanation: "WHERE clause filters rows based on conditions. Used with SELECT, UPDATE, DELETE to specify which rows to affect.",
        details: [
          "Comparison: =, !=, <, >, <=, >=",
          "Logical: AND, OR, NOT",
          "BETWEEN, IN, LIKE, IS NULL",
          "WHERE is evaluated BEFORE GROUP BY"
        ],
        example: `-- IN operator
SELECT * FROM Students WHERE Major IN ('CS', 'IT', 'ECE');

-- BETWEEN (inclusive)
SELECT * FROM Orders WHERE Amount BETWEEN 100 AND 500;

-- LIKE pattern matching
SELECT * FROM Customers WHERE Name LIKE 'A%';     -- starts with A
SELECT * FROM Products  WHERE Code LIKE 'AB_12';  -- _ = any 1 char

-- NULL checks
SELECT * FROM Employees WHERE ManagerID IS NULL;`
      },
      "GROUP BY": {
        explanation: "GROUP BY groups rows with the same values in specified columns into summary rows. Used with aggregate functions to calculate per-group statistics.",
        details: [
          "All non-aggregated columns in SELECT must be in GROUP BY",
          "Executed after WHERE, before HAVING",
          "Can group by multiple columns",
          "Produces one row per group"
        ],
        example: `SELECT DeptID, JobTitle, AVG(Salary) AS AvgSal
FROM Employees
GROUP BY DeptID, JobTitle;
-- One row per (department, job title) combination`
      },
      "HAVING": {
        explanation: "HAVING filters groups after GROUP BY. Unlike WHERE which filters rows before grouping, HAVING filters based on aggregate function results.",
        details: [
          "WHERE filters rows; HAVING filters groups",
          "HAVING comes after GROUP BY",
          "Can use aggregate functions in HAVING"
        ],
        example: `-- WHERE + HAVING together
SELECT DeptID, AVG(Salary) AS AvgSal
FROM Employees
WHERE Status = 'Active'          -- filter rows first
GROUP BY DeptID
HAVING AVG(Salary) > 60000;     -- then filter groups`
      },
      "INSERT": {
        explanation: "INSERT adds new rows to a table. Can insert one row, multiple rows, or results from a SELECT query.",
        details: [
          "Specify column names to avoid order dependency",
          "INSERT INTO ... SELECT: insert query results",
          "Omitted columns get NULL or DEFAULT values"
        ],
        example: `-- Multiple rows
INSERT INTO Students VALUES
(102, 'Bob',     21, 'EE'),
(103, 'Charlie', 19, 'CS');

-- Insert from SELECT
INSERT INTO Graduates (GID, Name, DeptID)
SELECT SID, Name, DeptID FROM Students WHERE GPA >= 3.5;`
      },
      "UPDATE": {
        explanation: "UPDATE modifies existing rows. Always use WHERE to specify which rows — without WHERE, ALL rows are updated!",
        details: [
          "SET clause specifies column = new value",
          "WHERE clause restricts which rows",
          "Can update multiple columns at once"
        ],
        example: `-- Update multiple columns
UPDATE Employees
SET Salary = Salary * 1.1, LastUpdated = NOW()
WHERE DeptID = 10;

-- DANGER: without WHERE → updates ALL rows!
-- Always verify with SELECT first!`
      },
      "DELETE": {
        explanation: "DELETE removes rows from a table. Always use WHERE to specify rows — without WHERE, ALL rows are deleted! DELETE can be rolled back (unlike TRUNCATE).",
        details: [
          "DELETE can be rolled back in a transaction",
          "Slower than TRUNCATE for large datasets",
          "DROP removes entire table (structure + data)"
        ],
        example: `DELETE FROM Orders WHERE OrderDate < '2020-01-01';

-- DELETE vs TRUNCATE vs DROP
DELETE   → removes rows, rollback possible
TRUNCATE → removes all rows, faster, resets auto-increment
DROP     → removes entire table permanently!`
      },
      "Subqueries": {
        explanation: "A subquery (inner query) is a query nested inside another SQL query. Used to break complex queries into simpler parts.",
        details: [
          "Scalar subquery: returns single value",
          "Table subquery: returns a table (used in FROM)",
          "Correlated subquery: references outer query columns"
        ],
        example: `-- Employees earning above average
SELECT Name, Salary FROM Employees
WHERE Salary > (SELECT AVG(Salary) FROM Employees);

-- Correlated: employees earning more than their dept avg
SELECT Name, Salary FROM Employees e
WHERE Salary > (
    SELECT AVG(Salary) FROM Employees
    WHERE DeptID = e.DeptID  -- references outer query
);`
      }
    }
  }
};

export default sqlData;
