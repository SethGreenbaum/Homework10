const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Paddydog90",
  database: "employee_tracker"
});

connection.connect(function(err) {
  if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "View all Roles",
          "View all Departments",
          "View all Employees",
          "Update Employee Role",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add a Department":
          addDepartment();
          break;
  
        case "Add a Role":
          addRole();
          break;
  
        case "Add an Employee":
          addEmployee();
          break;
  
        case "View all Roles":
          viewRoles();
          break;
  
        case "View all Departments":
          viewDepartments();
          break;
        
        case "View all Employees":
          viewEmployees();
          break;

        case "Update Employee Role":
          UpdateEmployeeRole();
          break;

        case "exit":
          connection.end();
          break;

        default:
          connection.end();
        }
      });
  };

function addDepartment() {
    inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter Department Name:"
    }).then(function(answer){
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query,[answer.department], function(err, res) {
          if (err) throw err;
          viewDepartments();
          runSearch();
        });
    })
};
function addRole() {

};
function addEmployee() {

};
function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res)
      runSearch();
    });
};
function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res)
      runSearch();
    });
};
function viewEmployees() {
    var query = "SELECT employee.first_name,employee.last_name,role.title,role.salary,department.name AS department FROM employee INNER JOIN (role INNER JOIN department ON role.department_id=department.id) ON employee.role_id=role.id";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res)
      runSearch();
    });
};

function UpdateEmployeeRole() {

};