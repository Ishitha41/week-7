-- =========================================================
-- 1. DROP TABLES IF EXIST
-- =========================================================
DROP TABLE IF EXISTS employee_30041;
DROP TABLE IF EXISTS department_30041;

-- =========================================================
-- 2. CREATE TABLES
-- =========================================================
CREATE TABLE department_30041 (
    deptid INT PRIMARY KEY,
    dname VARCHAR(50),
    dloc VARCHAR(50)
);

CREATE TABLE employee_30041 (
    empid INT PRIMARY KEY,
    ename VARCHAR(50),
    job VARCHAR(50),
    doj DATE,
    salary NUMERIC(12,2),
    email VARCHAR(100),
    deptid INT REFERENCES department_30041(deptid)
);

-- =========================================================
-- 3. INSERT SAMPLE DATA
-- =========================================================
INSERT INTO department_30041 (deptid, dname, dloc) VALUES
(101, 'HR', 'Hyderabad'),
(102, 'IT', 'Bangalore'),
(103, 'Finance', 'Chennai'),
(104, 'Development', 'Hyderabad'),
(105, 'Support', 'Pune');

INSERT INTO employee_30041 (empid, ename, job, doj, salary, email, deptid) VALUES
(8830, 'SMITH', 'Manager', '2023-07-03', 145000.00, 'smith@gmail.com', 101),
(8831, 'ALLEN', 'Application Developer', '2021-03-04', 125200.50, 'allen@gmail.com', 102),
(8832, 'WARD', 'Web Designer', '2025-08-06', 120000.00, 'ward@gmail.com', 103),
(8833, 'BLAKE', 'Software Engineer', '2020-11-19', 156500.00, 'blake@gmail.com', 104),
(8834, 'SCOTT', 'DevOps Engineer', '2024-08-27', 143500.00, 'scott@gmail.com', 105),
(8835, 'FORD', 'Data Analyst', '2023-07-21', 135000.00, 'ford@gmail.com', 104),
(8836, 'MILLER', 'Cloud Architect', '2023-05-02', 140000.00, 'miller@gmail.com', 101),
(8837, 'ADAMS', 'Technical Specialist', '2021-03-04', 112000.00, 'adams@gmail.com', 103),
(8838, 'JAMES', 'Network Administrator', '2023-07-03', 110000.00, 'james@gmail.com', 102),
(8839, 'MARTIN', 'SQL Developer', '2025-08-06', 175000.00, 'martin@gmail.com', 105);

-- =========================================================
-- 4. RELATIONAL ALGEBRA QUERIES (in SQL form)
-- =========================================================

-- π empid, ename, job (employee_30041)
SELECT empid, ename, job FROM employee_30041;

-- σ deptid = 101 (employee_30041)
SELECT * FROM employee_30041 WHERE deptid = 101;

-- σ salary > 140000 (employee_30041)
SELECT ename, salary FROM employee_30041 WHERE salary > 140000;

-- E ⨝ D  (Natural Join on deptid)
SELECT e.ename, d.dname, d.dloc
FROM employee_30041 e
JOIN department_30041 d ON e.deptid = d.deptid;

-- π ename, dname (E ⨝ D, σ dloc='Hyderabad')
SELECT e.ename, d.dname
FROM employee_30041 e
JOIN department_30041 d ON e.deptid = d.deptid
WHERE d.dloc = 'Hyderabad';

-- E − (E ⨝ D)  (employees without valid department)
SELECT e.*
FROM employee_30041 e
WHERE NOT EXISTS (
    SELECT 1 FROM department_30041 d WHERE d.deptid = e.deptid
);

-- (σ deptid=101 (E)) ∪ (σ deptid=102 (E))
SELECT empid, ename FROM employee_30041 WHERE deptid = 101
UNION
SELECT empid, ename FROM employee_30041 WHERE deptid = 102;

-- Self-join to list employees in same dept
SELECT e1.ename AS emp1, e2.ename AS emp2, e1.deptid
FROM employee_30041 e1
JOIN employee_30041 e2 ON e1.deptid = e2.deptid AND e1.empid <> e2.empid;

-- γ avg(salary) (employee_30041)
SELECT AVG(salary) AS avg_salary FROM employee_30041;

-- γ deptid; avg(salary) (employee_30041)
SELECT deptid, AVG(salary) AS avg_salary
FROM employee_30041
GROUP BY deptid;

-- γ deptid; count(empid) σ count > 2 (employee_30390)
SELECT deptid, COUNT(empid) AS emp_count
FROM employee_30041
GROUP BY deptid
HAVING COUNT(empid) > 2;

-- Employees with salary > dept average
WITH DeptAvg AS (
  SELECT deptid, AVG(salary) AS avg_sal
  FROM employee_30041
  GROUP BY deptid
)
SELECT e.ename, e.salary, e.deptid
FROM employee_30041 e
JOIN DeptAvg da ON e.deptid = da.deptid
WHERE e.salary > da.avg_sal;

-- Employees with max salary per dept
WITH MaxSal AS (
  SELECT deptid, MAX(salary) AS max_sal
  FROM employee_30041
  GROUP BY deptid
)
SELECT e.ename, e.salary, e.deptid
FROM employee_30041 e
JOIN MaxSal m ON e.deptid = m.deptid AND e.salary = m.max_sal;

-- Outer join (E ⟕ D)
SELECT e.ename, e.job, d.dname, d.dloc
FROM employee_30041 e
LEFT JOIN department_30041 d ON e.deptid = d.deptid;

-- σ job LIKE '%Engineer%'
SELECT empid, ename, job
FROM employee_30041
WHERE job ILIKE '%Engineer%';