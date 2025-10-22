-- -------------------------------
-- 1. Drop tables if they exist
-- -------------------------------
DROP TABLE IF EXISTS Courses;
DROP TABLE IF EXISTS Students;

-- -------------------------------
-- 2. Create Students table
-- -------------------------------
CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(50)
);

-- -------------------------------
-- 3. Create Courses table
-- -------------------------------
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(50),
    StudentID INT  -- foreign key to Students
);

-- -------------------------------
-- 4. Insert sample data
-- -------------------------------
-- Students
INSERT INTO Students (StudentID, Name) VALUES
(1, 'Ravi'),
(2, 'Sita'),
(3, 'Anil');

-- Courses
INSERT INTO Courses (CourseID, CourseName, StudentID) VALUES
(101, 'Math', 1),
(102, 'Science', 2),
(103, 'English', 1),
(104, 'History', 3);

-- -------------------------------
-- 5. Simple Join Queries
-- -------------------------------

-- INNER JOIN: only matching rows
SELECT s.StudentID, s.Name, c.CourseName
FROM Students s
INNER JOIN Courses c
ON s.StudentID = c.StudentID;

-- LEFT JOIN: all students, even without courses
SELECT s.StudentID, s.Name, c.CourseName
FROM Students s
LEFT JOIN Courses c
ON s.StudentID = c.StudentID;

-- RIGHT JOIN: all courses, even if no student
SELECT s.StudentID, s.Name, c.CourseName
FROM Students s
RIGHT JOIN Courses c
ON s.StudentID = c.StudentID;

-- FULL OUTER JOIN: all students + all courses
SELECT s.StudentID, s.Name, c.CourseName
FROM Students s
FULL OUTER JOIN Courses c
ON s.StudentID = c.StudentID;
joins