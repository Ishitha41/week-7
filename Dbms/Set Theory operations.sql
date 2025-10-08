-- Drop the tables if they already exist
DROP TABLE IF EXISTS GroupA;
DROP TABLE IF EXISTS GroupB;

-- Recreate the tables
CREATE TABLE GroupA (
    StudentID INT,
    Name VARCHAR(100)
);

CREATE TABLE GroupB (
    StudentID INT,
    Name VARCHAR(100)
);

-- Insert into GroupA
INSERT INTO GroupA VALUES (1, 'Alice'), (2, 'Bob');

-- Insert into GroupB
INSERT INTO GroupB VALUES (2, 'Bob'), (3, 'Charlie');

-- UNION (all unique students from both groups)
SELECT * FROM GroupA
UNION
SELECT * FROM GroupB;

-- INTERSECT (students in both groups)
SELECT * FROM GroupA
INTERSECT
SELECT * FROM GroupB;

-- EXCEPT (students in GroupA but not in GroupB)
SELECT * FROM GroupA
EXCEPT
SELECT * FROM GroupB;
