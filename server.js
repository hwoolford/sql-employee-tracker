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





app.use((req, res) => {
    res.status(404).end();
  });

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);