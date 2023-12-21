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
  console.log(`Connected to the tracker_db database.`)
);

app.get('/api/departments', (req, res) => {
  const sql = `SELECT id, department_name AS department FROM department`;

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


app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);