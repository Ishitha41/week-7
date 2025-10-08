
CREATE TABLE employee_30041 (
    empid INT PRIMARY KEY,
    ename VARCHAR(50),
    job VARCHAR(50),
    doj DATE,
    salary NUMERIC(12,2),
    email VARCHAR(100),
    deptid INT
);

INSERT INTO employee_30041 (empid, ename, job, doj, salary, email, deptid) VALUES
(8830, 'SMITH', 'Manager', '2023-07-03', 145000.00, 'smith@gmail.com', 101),
(8831, 'ALLEN', 'Application Developer', '2021-03-04', 125200.50, 'allen@gmail.com', 102),
(8832, 'WARD', 'Web Designer', '2025-08-06', 120000.00, 'ward@gamil.com', 103),
(8833, 'BLAKE', 'Software Engineer', '2020-11-19', 156500.00, 'blake@gamil.com', 104),
(8834, 'SCOTT', 'DevOps Engineer', '2024-08-27', 143500.00, 'scott@gamil.com', 105),
(8835, 'FORD', 'Data Analyst', '2023-07-21', 135000.00, 'ford@gamil.com', 104),
(8836, 'MILLER', 'Cloud Architect', '2023-05-02', 140000.00, 'miller@gamil.com', 101),
(8837, 'ADAMS', 'Technical Specialist', '2021-03-04', 112000.00, 'adams@gamil.com', 103),
(8838, 'JAMES', 'Network Administrator', '2023-07-03', 110000.00, 'james@gamil.com', 102),
(8839, 'MARTIN', 'SQL Developer', '2025-08-06', 175000.00, 'martin@gmail.com', 105);

SELECT * FROM employee_30041;

CREATE TABLE department_30041 (
    deptid INT PRIMARY KEY,
    dname VARCHAR(50),
    dloc VARCHAR(50)
);

INSERT INTO department_30041 (deptid, dname, dloc) VALUES
(101, 'Accounting', 'Hyderabad'),
(102, 'Research', 'Pune'),
(103, 'Sales', 'Mumbai'),
(104, 'IT', 'Delhi'),
(105, 'Engineering', 'Kerala');

SELECT * FROM department_30041;