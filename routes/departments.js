require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");

const router = express.Router();

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

// Get all departments
router.get('/', (req, res) => {
  db.query('SELECT id, name FROM departments', (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    } else {
      res.json(results);
    }
  });
});

// Create a new department
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO departments (name) VALUES (?)', [name], (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    } else {
      res.status(201).json({ message: 'Department created successfully' });
    }
  });
});

// Update an existing department
router.put('/:id', (req, res) => {
  const departmentId = req.params.id;
  const { name } = req.body;
  db.query('UPDATE departments SET name = ? WHERE id = ?', [name, departmentId], (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    } else {
      res.json({ message: 'Department updated' });
    }
  });
});

// Delete a department
router.delete('/:id', (req, res) => {
  const departmentId = req.params.id;
  db.query('DELETE FROM departments WHERE id = ?', [departmentId], (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    } else {
      res.json({ message: 'Department deleted' });
    }
  });
});

module.exports = router;