INSERT INTO departments (name)
VALUES ('Marketing'),
        ('Sales'),
        ('Human Resources'),
        ('IT');

-- Inserting roles
INSERT INTO roles (title, salary, department_id)
VALUES ('Marketing Manager', 97000, 1),
        ('Brand Strategist', 65000, 1),
        ('Sales Manager', 75000, 2),
        ('Sales Specialist', 45000, 2),
        ('Employee Relations Manager', 106000, 3),
        ('HR Analyst', 63000, 3),
        ('Systems Analyst', 85000, 4),
        ('IT Coordinator', 66000, 4);

-- Inserting employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Jeve', 'Stobs', 4, 1),
        ('Chandler', 'Bing', 3, NULL),
        ('Jane', 'Doe', 1, 2),
        ('Lisa', 'Simpson', 2, NULL),
        ('Roger', 'Smith', 3, NULL);