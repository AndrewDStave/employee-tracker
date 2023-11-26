SELECT employees.id AS 'Employee ID', employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Job Title', departments.name AS 'Department', roles.salary AS 'Salary', CONCAT(managers.first_name, ' ', managers.last_name) AS 'Manager'
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees AS managers ON employees.manager_id = managers.id;