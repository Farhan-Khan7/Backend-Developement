CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),

    email VARCHAR(322) UNIQUE NOT NULL,
    phone_number VARCHAR(10) UNIQUE NOT NULL,
    country_code INT(4),

    age INT CHECK (age > 12)

    current_status VARCHAR(20) DEFAULT 'active' CHECK (current_status IN ('active' , 'graduate' , 'dropped_out'))

    masterji_handle VARCHAR(50) UNIQUE

    has_joined_masterji BOOLEAN DEFAULT FALSE
)