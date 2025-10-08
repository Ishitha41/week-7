-- Step 1: Drop tables if they exist
DROP VIEW IF EXISTS StudentGrades;
DROP TABLE IF EXISTS Enrollments;
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Students;

-- Step 2: Create Students table
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100),
    Age INT,
    Department VARCHAR(50)
);

-- Step 3: Create Courses table
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    Department VARCHAR(50)
);

-- Step 4: Create Enrollments table
CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    Grade CHAR(1),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

-- Step 5: Insert sample data into Students
INSERT INTO Students VALUES
(1, 'Alice', 20, 'CS'),
(2, 'Bob', 22, 'IT'),
(3, 'Charlie', 21, 'CS');

-- Step 6: Insert sample data into Courses
INSERT INTO Courses VALUES
(101, 'Data Structures', 'CS'),
(102, 'Networks', 'IT'),
(103, 'DBMS', 'CS');

-- Step 7: Insert sample data into Enrollments
INSERT INTO Enrollments VALUES
(1, 1, 101, 'A'),
(2, 1, 103, 'B'),
(3, 2, 102, 'A'),
(4, 3, 103, 'C');

-- Step 8: Create the view
CREATE VIEW StudentGrades AS
SELECT S.Name, C.CourseName, E.Grade
FROM Students S
JOIN Enrollments E ON S.StudentID = E.StudentID
JOIN Courses C ON E.CourseID = C.CourseID;

-- Step 9: Query the view
SELECT * FROM StudentGrades;
