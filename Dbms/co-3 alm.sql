-- Step 1: Unnormalized Table
CREATE TABLE Student_Course_Unnormalized (
    Student_ID INT,
    Student_Name VARCHAR(50),
    Course_Enrolled VARCHAR(200),
    Faculty VARCHAR(200),
    Marks VARCHAR(50)
);

INSERT INTO Student_Course_Unnormalized VALUES
(101, 'Anil', 'DBMS, OOPS', 'Dr. Rao, Dr. Meena', '85, 78'),
(102, 'Priya', 'DBMS, Networks, OOPS', 'Dr. Rao, Dr. Kumar, Dr. Meena', '88, 90, 80'),
(103, 'Kiran', 'Networks', 'Dr. Kumar', '92');

SELECT * FROM Student_Course_Unnormalized;

-- Step 2: Student Table (1NF)
CREATE TABLE Student (
    Student_ID INT PRIMARY KEY,
    Student_Name VARCHAR(50)
);

INSERT INTO Student VALUES
(101, 'Anil'),
(102, 'Priya'),
(103, 'Kiran');

SELECT * FROM Student;

-- Step 3: Course Enrollment Table (2NF)
CREATE TABLE Enrollment (
    Student_ID INT,
    Course_Name VARCHAR(50),
    Faculty VARCHAR(50),
    Marks INT,
    PRIMARY KEY (Student_ID, Course_Name),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID)
);

INSERT INTO Enrollment VALUES
(101, 'DBMS', 'Dr. Rao', 85),
(101, 'OOPS', 'Dr. Meena', 78),
(102, 'DBMS', 'Dr. Rao', 88),
(102, 'Networks', 'Dr. Kumar', 90),
(102, 'OOPS', 'Dr. Meena', 80),
(103, 'Networks', 'Dr. Kumar', 92);

SELECT * FROM Enrollment;

-- Step 4: Faculty Table (3NF)
CREATE TABLE Faculty (
    Faculty_Name VARCHAR(50) PRIMARY KEY,
    Department VARCHAR(50)
);

INSERT INTO Faculty VALUES
('Dr. Rao', 'Computer Science'),
('Dr. Meena', 'Computer Science'),
('Dr. Kumar', 'Information Technology');

SELECT * FROM Faculty;

-- Step 5: Final Normalized Enrollment Table (3NF)
CREATE TABLE Enrollment_3NF (
    Student_ID INT,
    Course_Name VARCHAR(50),
    Faculty_Name VARCHAR(50),
    Marks INT,
    PRIMARY KEY (Student_ID, Course_Name),
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
    FOREIGN KEY (Faculty_Name) REFERENCES Faculty(Faculty_Name)
);

INSERT INTO Enrollment_3NF VALUES
(101, 'DBMS', 'Dr. Rao', 85),
(101, 'OOPS', 'Dr. Meena', 78),
(102, 'DBMS', 'Dr. Rao', 88),
(102, 'Networks', 'Dr. Kumar', 90),
(102, 'OOPS', 'Dr. Meena', 80),
(103, 'Networks', 'Dr. Kumar', 92);

SELECT * FROM Enrollment_3NF;
