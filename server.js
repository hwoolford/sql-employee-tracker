const express = require("express");
const mysql = require('mysql2');
const inquirer = require("inquirer");
const path = require("path");
const questions = require("./assets/prompts.js")

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to tracker_db database
const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tracker_db'
  },
);

// Show all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT id AS department_id, department_name AS department FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Show all roles
app.get('/api/role', (req, res) => {
   const sql = `SELECT role.id AS role_id, role.title AS job_title, department.department_name AS department, role.salary FROM role JOIN department ON role.department_id = department.id`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Show all employees
app.get('/api/employee', (req, res) => {
  const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.department_name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;

 db.query(sql, (err, rows) => {
   if (err) {
     res.status(500).json({error: err.message});
     return;
   }
   res.json({
     message: 'success',
     data: rows
   });
 });
});

// Add a new department
app.post('/api/new-department', ({body}, res) => {
  const sql = `INSERT INTO department (department_name) VALUES (?)`;
  const params = [body.department_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
      return;
    }
    res.json({
      message: 'Department name added to the database.',
      data: body
    });
  });
});

// Add a new role
app.post('/api/new-role', ({body}, res) => {
  const sql = `INSERT INTO role (title, salary, department_name) VALUES (?)`;
  const params = [body.title, body.salary, body.department_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
      return;
    }
    res.json({
      message: 'Role added to the database.',
      data: body
    });
  });
});

// Add a new employee
app.post('/api/new-employee', ({body}, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, title, manager_first_name, manager_last_name) VALUES (?, ?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.title, body.manager_first_name, body.manager_last_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
      return;
    }
    res.json({
      message: 'Employee added to the database.',
      data: body
    });
  });
});

// Update employee role
app.put('/api/role/:id', (req, res) => {
  const sql = `UPDATE role SET role = ? WHERE id = ?`;
  const params = [req.body.role, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      res.json({
        message: 'Employee role updated.',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});



// Response for any requests not found
app.use((req, res) => {
    res.status(404).end();
  });

// Listens to the port to start the server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);