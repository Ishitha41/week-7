
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(50),
    Job VARCHAR(30),
    Salary DECIMAL(10,2)
);

-- 2. INSERT Command (add rows into table)
INSERT INTO Employees (EmpID, EmpName, Job, Salary)
VALUES 
(101, 'Alice', 'Manager', 75000),
(102, 'Bob', 'Developer', 60000),
(103, 'Charlie', 'Analyst', 55000);

-- 3. SELECT Command (view data)
SELECT * FROM Employees;

-- 4. UPDATE Command (modify data)
UPDATE Employees
SET Salary = 65000
WHERE EmpID = 102;

-- 5. DELETE Command (remove data)
DELETE FROM Employees
WHERE EmpID = 103;

-- 6. SELECT again to verify changes
SELECT * FROM Employees;

