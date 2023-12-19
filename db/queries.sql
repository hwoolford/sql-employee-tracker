const mysql = require('mysql2');
const questions = require("./assets/prompts.js")

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tracker_db'
    },
);


db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
});


db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
});


db.query('SELECT * FROM employee', function (err, results) {
    console.log(results);
});

-- SELECT *
-- FROM course_names
-- JOIN department ON course_names.department = department.id;