const inquirer = require("inquirer");
const axios = require('axios');

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
                return answers.question === "Add Department"
            },
        },
        {
            type: "input",
            message: "What is the name of the role?",
            name: "role",
            when(answers) {
                return answers.question === "Add Role"
            },
            
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "roleSalary",
            when(answers) {
                return answers.question === "Add Role"
            },
            
        },
        {
            type: "list",
            message: "Which department does the role belong to?",
            name: "roleDepartment",
            choices: [
                "Engineering",
                "Finance",
                "Legal",
                "Sales",
                "Service",
            ],
            when(answers) {
                return answers.question === "Add Role"
            },
            
        },
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "employeeFirst",
            when(answers) {
                return answers.question === "Add Employee"
            },
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "employeeLast",
            when(answers) {
                return answers.question === "Add Employee"
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
                return answers.question === "Add Employee"
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
                return answers.question === "Add Employee"
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
                return answers.question === "Update Employee Role"
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
                return answers.question === "Update Employee Role"
            },
            
        },
    ]);
};

const init = () => {
    questions()
    .then((answers) => {
        const {question} = answers
        if (question === 'View All Departments') {
            axios.get('http://localhost:3000/api/department')
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
         } else if (question === 'View All Roles') {
            axios.get('http://localhost:3000/api/role')
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
         } else if (question === 'View All Employees') {
            axios.get('http://localhost:3000/api/employee')
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
         }
    });
}

  
  init();