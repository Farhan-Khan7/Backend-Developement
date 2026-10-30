-- 1. Students table
CREATE TABLE practice_students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(50),
    age INT
);
-- 2. Courses table
CREATE TABLE practice_courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    price INT
);
-- 3. Enrollments table
CREATE TABLE practice_enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES practice_students(student_id),
    course_id INT REFERENCES practice_courses(course_id),
    enrollment_date DATE DEFAULT CURRENT_DATE
);



-- Insert students
INSERT INTO practice_students (name, country, age)
VALUES 
    ('Farhan', 'India', 20),
    ('Rahul', 'India', 22),
    ('Aman', 'India', 21),
    ('Sara', 'Bangladesh', 23),
    ('John', 'USA', 25),
    ('Emma', 'USA', 19),
    ('Ali', 'Bangladesh', 20),
    ('David', 'UK', 24);


-- Insert courses
INSERT INTO practice_courses (course_name, price)
VALUES 
    ('Full Stack Development', 15000),
    ('Backend Development', 12000),
    ('Data Science', 18000),
    ('UI/UX Design', 8000),
    ('Machine Learning', 20000);
-- Insert enrollments


INSERT INTO practice_enrollments (student_id, course_id)
VALUES 
    (1, 1),
    (1, 2),
    (2, 1),
    (3, 3),
    (4, 2),
    (5, 5),
    (6, 4),
    (7, 1);
-- Notice:
-- Student ID 8 (David) is not enrolled in any course.
-- Course ID 5 is enrolled by John.
-- Some courses have no students enrolled.


SELECT * FROM practice_students;
SELECT * FROM practice_courses;
SELECT * FROM practice_enrollments;


SELECT
    s.student_id,
    s.name AS student_name,
    c.course_name,
    c.price

FROM practice_students AS s

INNER JOIN practice_enrollments AS e
    ON s.student_id = e.student_id

INNER JOIN practice_courses AS c
    ON e.course_id = c.course_id;