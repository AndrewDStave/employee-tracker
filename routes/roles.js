require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Connect
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected Successfully!")
);

// Get roles
router.get("/", (req, res) => {
  const query = "SELECT * FROM roles";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error retrieving roles:", error);
      res.status(500).json({ error: "Error retrieving roles" });
    } else {
      res.json(results);
    }
  });
});

// Get role by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM roles WHERE id = ?";
  const values = [id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error retrieving role:", error);
      res.status(500).json({ error: "Error retrieving role" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Role not found" });
    } else {
      res.json(results[0]);
    }
  });
});

// Creates role
router.post("/", (req, res) => {
  const { title, salary } = req.body;
  const query = "INSERT INTO roles (title, salary) VALUES (?, ?)";
  const values = [title, salary];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error creating role:", error);
      res.status(500).json({ error: "Error creating role" });
    } else {
      res.json({ message: "Role created successfully!" });
    }
  });
});

// Function to update role
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, salary } = req.body;
  const query = "UPDATE roles SET title = ?, salary = ? WHERE id = ?";
  const values = [title, salary, id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating role:", error);
      res.status(500).json({ error: "Error updating role" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Role not found" });
    } else {
      res.json({ message: "Role updated successfully!" });
    }
  });
});

// Function to delete a role
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM roles WHERE id = ?";
  const values = [id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error deleting role:", error);
      res.status(500).json({ error: "Error deleting role" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Role not found" });
    } else {
      res.json({ message: "Role deleted" });
    }
  });
});

module.exports = router;