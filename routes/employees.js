require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Establishing a connection
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected Successfully!")
);

router.get("/", (req, res) => {
  const query = `
  SELECT employees.id, employees.first_name, employees.last_name, departments.name AS department, roles.title, roles.salary
  FROM employees
  INNER JOIN roles ON employees.role_id = roles.id
  INNER JOIN departments ON roles.department_id = departments.id
`;

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving employees:", error);
      res.status(500).json({ error: "Error retrieving employees" });
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM employees WHERE id = ?";
  const values = [id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error retrieving employee:", error);
      res.status(500).json({ error: "Error retrieving employee" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// Create a new employee
router.post("/", (req, res) => {
  const { firstName, lastName, department, role, salary } = req.body;
  const query =
    "INSERT INTO employees (first_name, last_name, department_id, title, salary) VALUES (?, ?, ?, ?, ?)";
  const values = [firstName, lastName, department, role, salary];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({ error: "Error creating employee" });
    } else {
      res.json({ message: "Employee created" });
    }
  });
});

// Update an existing employee
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const query =
    "UPDATE employees SET first_name = ?, last_name = ? WHERE id = ?";
  const values = [firstName, lastName, id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ error: "Error updating employee" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json({ message: "Employee updated" });
    }
  });
});

// Delete an employee
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM employees WHERE id = ?";
  const values = [id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({ error: "Error deleting employee" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json({ message: "Employee deleted successfully!" });
    }
  });
});

module.exports = router;