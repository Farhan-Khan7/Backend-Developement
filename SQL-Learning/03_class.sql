
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
