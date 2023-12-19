USE tracker_db;

INSERT INTO department
VALUES
(100, "Engineering"),
(101, "Finance"),
(102, "Legal"),
(103, "Sales"),
(104, "Service");

INSERT INTO role
VALUES
(200, "Sales Lead", 80000, 103),
(201, "Salesperson", 50000, 103),
(202, "Lead Engineer", 100000, 100),
(203, "Software Engineer", 90000, 100),
(204, "Account Manager", 70000, 101),
(205, "Accountant", 80000, 101),
(206, "Legal Team Lead", 120000, 102),
(207, "Lawyer", 100000, 102),
(208, "Customer Service", 50000, 104);

INSERT INTO employee
VALUES
(001, "John", "Doe", 200, 006),
(002, "Mike", "Chan", 201, 005),
(003, "Ashley", "Rodriguez", 202, 001),
(004, "Kevin", "Tupik", 203, 002),
(005, "Kunal", "Singh", 204, 004),
(006, "Malia", "Brown", 205, 004),
(007, "Sarah", "Lourd", 206, 003),
(008, "Tom", "Allen", 207, 005),
(009, "Sam", "Kash", 208, 001);

