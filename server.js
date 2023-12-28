const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Connect to tracker_db database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tracker_db",
});

const questions = () => {
  return inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "question",
      choices: [
        "Add Employee",
        "View All Employees",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    },
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department",
      when(answers) {
        return answers.question === "Add Department";
      },
    },
    {
      type: "input",
      message: "What is the name of the role?",
      name: "role",
      when(answers) {
        return answers.question === "Add Role";
      },
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "roleSalary",
      when(answers) {
        return answers.question === "Add Role";
      },
    },
    {
      type: "list",
      message: "Which department does the role belong to?",
      name: "roleDepartment",
      choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
      when(answers) {
        return answers.question === "Add Role";
      },
    },
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "employeeFirst",
      when(answers) {
        return answers.question === "Add Employee";
      },
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "employeeLast",
      when(answers) {
        return answers.question === "Add Employee";
      },
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "employeeRole",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
        "Lawyer",
        "Customer Service",
      ],
      when(answers) {
        return answers.question === "Add Employee";
      },
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "employeeManager",
      choices: [
        "None",
        "John Doe",
        "Mike Chan",
        "Ashley Rodriguez",
        "Kevin Tupik",
        "Kunal Singh",
        "Malia Brown",
      ],
      when(answers) {
        return answers.question === "Add Employee";
      },
    },
    {
      type: "list",
      message: "Which Employee's role do you want to update?",
      name: "updateRole",
      choices: [
        "John Doe",
        "Mike Chan",
        "Ashley Rodriguez",
        "Kevin Tupik",
        "Kunal Singh",
        "Malia Brown",
        "Sarah Lourd",
        "Tom Allen",
        "Sam Kash",
      ],
      when(answers) {
        return answers.question === "Update Employee Role";
      },
    },
    {
      type: "list",
      message: "Which role do you want to assign the selected employee?",
      name: "employeeRole",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
        "Lawyer",
        "Customer Service",
      ],
      when(answers) {
        return answers.question === "Update Employee Role";
      },
    },
  ]);
};

const init = () => {
  questions().then((answers) => {
    const { question } = answers;
    if (question === "View All Departments") {
      const sql = `SELECT id AS department_id, department_name AS department FROM department`;
      db.query(sql, (err, res) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        } else {
          console.table(res);
          init();
        }
      });
    } else if (question === "View All Roles") {
      const sql = `SELECT role.id AS role_id, role.title AS job_title, department.department_name AS department, role.salary FROM role JOIN department ON role.department_id = department.id`;
      db.query(sql, (err, res) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        } else {
          console.table(res);
          init();
        }
      });
    } else if (question === "View All Employees") {
      const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.department_name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
      db.query(sql, (err, res) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        } else {
          console.table(res);
          init();
        }
      });
    } else if (question === "Add Department") {
      app.post("/api/new-department", ({ body }, res) => {
        const sql = `INSERT INTO department (department_name) VALUES (?)`;
        const params = [body.department_name];

        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.json({
            message: "Department name added to the database.",
            data: body,
          });
        });
      });
      init();
    } else if (question === "Add Role") {
      app.post("/api/new-role", ({ body }, res) => {
        const sql = `INSERT INTO role (title, salary, department_name) VALUES (?)`;
        const params = [body.title, body.salary, body.department_name];

        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "Role added to the database.",
            data: body,
          });
        });
      });
      init();
    } else if (question === "Add Employee") {
      app.post("/api/new-employee", ({ body }, res) => {
        const sql = `INSERT INTO employee (first_name, last_name, title, manager_first_name, manager_last_name) VALUES (?, ?, ?, ?, ?)`;
        const params = [
          body.first_name,
          body.last_name,
          body.title,
          body.manager_first_name,
          body.manager_last_name,
        ];

        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          res.json({
            message: "Employee added to the database.",
            data: body,
          });
        });
      });
      init();
    } else if (question === "Update Employee Role") {
      app.put("/api/role/:id", (req, res) => {
        const sql = `UPDATE role SET role = ? WHERE id = ?`;
        const params = [req.body.role, req.params.id];

        db.query(sql, params, (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
          } else {
            res.json({
              message: "Employee role updated.",
              data: req.body,
              changes: result.affectedRows,
            });
          }
        });
      });
      init();
    }
  });
};

init();

// Add a new department
// app.post('/api/new-department', ({body}, res) => {
//   const sql = `INSERT INTO department (department_name) VALUES (?)`;
//   const params = [body.department_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({error: err.message});
//       return;
//     }
//     res.json({
//       message: 'Department name added to the database.',
//       data: body
//     });
//   });
// });

// Add a new role
// app.post('/api/new-role', ({body}, res) => {
//   const sql = `INSERT INTO role (title, salary, department_name) VALUES (?)`;
//   const params = [body.title, body.salary, body.department_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({error: err.message});
//       return;
//     }
//     res.json({
//       message: 'Role added to the database.',
//       data: body
//     });
//   });
// });

// Add a new employee
// app.post('/api/new-employee', ({body}, res) => {
//     const sql = `INSERT INTO employee (first_name, last_name, title, manager_first_name, manager_last_name) VALUES (?, ?, ?, ?, ?)`;
//     const params = [body.first_name, body.last_name, body.title, body.manager_first_name, body.manager_last_name];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({error: err.message});
//       return;
//     }
//     res.json({
//       message: 'Employee added to the database.',
//       data: body
//     });
//   });
// });

// // Update employee role
// app.put('/api/role/:id', (req, res) => {
//   const sql = `UPDATE role SET role = ? WHERE id = ?`;
//   const params = [req.body.role, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else {
//       res.json({
//         message: 'Employee role updated.',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// Response for any requests not found
app.use((req, res) => {
  res.status(404).end();
});

// Listens to the port to start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
