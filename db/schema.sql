DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Uses the database
USE employee_db;

-- Creating the department table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- Creating the role table
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(8, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Creating the employees table
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    title VARCHAR(30),
    name VARCHAR(30),
    salary DECIMAL(8, 2),
    role_id INT,
    manager_id INT,
    department_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);