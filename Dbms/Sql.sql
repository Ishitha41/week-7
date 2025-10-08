
CREATE TABLE school (
    id INT PRIMARY KEY,
    school_name VARCHAR(40),
    no_of_students INT,
    no_of_classrooms INT,
    email VARCHAR(40)
);

INSERT INTO school(id, school_name, no_of_students, no_of_classrooms, email) VALUES
(11, 'Boys Town Public School', 1000, 12, 'btps15@gmail.com'),
(2, 'Guru Govind Singh Public School', 800, 15, 'ggps25@gmail.com'),
(3, 'Delhi Public School', 1200, 10, 'dps101@gmail.com'),
(4, 'Ashoka Universal School', 1110, 40, 'aus17@gmail.com'),
(5, 'Calibers English Medium School', 9000, 50, 'cems@gmail.com');


SELECT * FROM school;

ALTER TABLE school ADD board_of_education VARCHAR(20);
SELECT * FROM school;

ALTER TABLE school DROP COLUMN board_of_education;
SELECT * FROM school;

ALTER TABLE school CHANGE no_of_students count_students INT;

SELECT * FROM school;

ALTER TABLE school MODIFY id VARCHAR(40);
SELECT * FROM school;

RENAME TABLE school TO KLH_school;
SELECT * FROM KLH_school;

UPDATE KLH_school SET count_students = 1200, no_of_classrooms = 120 WHERE id = '3';
SELECT * FROM KLH_school;

DELETE FROM KLH_school WHERE id = '11';
SELECT * FROM KLH_school;


SELECT * FROM KLH_school WHERE no_of_classrooms > 40;
SELECT * FROM KLH_school WHERE count_students = 800;

COMMIT;

