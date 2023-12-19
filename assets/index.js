const inquirer = require("inquirer");

const questions = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "question",
            choices: [
                "View All Employees",
                "Add Employee",
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
            when(answer) {
                return answer.question === "Add Department"
            },
            // Added (dept name) to the database.
        },
        {
            type: "input",
            message: "What is the name of the role?",
            name: "role",
            when(answer) {
                return answer.question === "Add Role"
            },
            
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "roleSalary",
            when(answer) {
                return answer.question === "Add Role"
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
            when(answer) {
                return answer.question === "Add Role"
            },
            
        },
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "employeeFirst",
            when(answer) {
                return answer.question === "Add Employee"
            },
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "employeeLast",
            when(answer) {
                return answer.question === "Add Employee"
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
            when(answer) {
                return answer.question === "Add Employee"
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
            when(answer) {
                return answer.question === "Add Employee"
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
            when(answer) {
                return answer.question === "Update Employee Role"
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
            when(answer) {
                return answer.question === "Update Employee Role"
            },
            
        },
    ]);
};