const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
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
          "Add a Manager",
          "View all Roles",
          "View all Departments",
          "View all Employees",
          "View all Managers",
          "View Department Payroll Budgets",
          "Update Employee Role",
          "Delete Employee",
          "Delete Role",
          "Delete Department",
          "Delete Manager",
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

        case "Add a Manager":
          addManager();
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
        
        case "View all Managers":
          viewManagers();
          break;

        case "View Department Payroll Budgets":
          viewPayroll();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Delete Employee":
          deleteEmployee();
          break;

        case "Delete Role":
          deleteRole();
          break;

        case "Delete Department":
          deleteDepartment();
          break;

        case "Delete Manager":
          deleteManager();
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
    .prompt([{
      name: "department",
      type: "input",
      message: "Enter Department Name:"
    }]).then(function(answer){
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query,[answer.department], function(err, res) {
          if (err) throw err;
          console.log("added succesfully");
          runSearch();
        });
    })
};
function addManager() {
  inquirer
  .prompt([{
    name: "manager",
    type: "input",
    message: "Enter Manager Name:"
  }]).then(function(answer){
      var query = "INSERT INTO manager (manager_name) VALUES (?)";
      connection.query(query,[answer.manager], function(err, res) {
        if (err) throw err;
        console.log("added succesfully");
        runSearch();
      });
  })
};
function addRole() {
    inquirer
    .prompt([{
      name: "role",
      type: "input",
      message: "Enter role"
    },
    {
      name: "id",
      type: "input",
      message: "Enter department id"
    },
    {
      name: "salary",
      type: "input",
      message: "Enter salary"
    }]).then(function(answer){
        var id = parseInt(answer.id);
        var salary = parseFloat(answer.salary);
        var query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query,[answer.role,salary,id], function(err, res) {
          if (err) throw err;
          console.log("added succesfully");
          viewRoles();
          runSearch();
        });
    })
};
function addEmployee() {
    inquirer.prompt([{
      name: "first",
      type: "input",
      message: "Enter first name"
    },
    {
      name: "last",
      type: "input",
      message: "Enter last name"
    },
    {
      name: "id",
      type: "input",
      message: "Enter role id"
    },
    {
      name: "manager",
      type: "input",
      message: "Enter manager id"
    }
    ]).then(function(answer){
        var id = parseInt(answer.id);
        var manager = parseFloat(answer.manager);
        var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
        connection.query(query,[answer.first,answer.last,id,manager], function(err, res) {
          if (err) throw err;
          console.log("added succesfully");
          runSearch();
        });
    })
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
function viewManagers() {
  var query = "SELECT * FROM manager";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
};
function viewEmployees() {
    var query = "SELECT employee.id,employee.first_name,employee.last_name, role.title,role.salary,department.name AS department,manager.manager_name FROM (employee INNER JOIN manager ON employee.manager_id=manager.id) INNER JOIN (role INNER JOIN department ON role.department_id=department.id) ON employee.role_id=role.id";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res)
      runSearch();
    });
};

function viewPayroll() {
  var query = "SELECT SUM(role.salary) AS payroll,department.name AS department FROM employee INNER JOIN (role INNER JOIN department ON role.department_id=department.id) ON employee.role_id=role.id GROUP BY department.name";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res)
    runSearch();
  });
};

function updateEmployeeRole() {
  inquirer
  .prompt([{
    name: "id",
    type: "input",
    message: "Enter Employee id:"
  },{
    name: "role",
    type: "input",
    message: "Enter new role id:"
  }]).then(function(answer){
    var employee = answer.id;
    var role = answer.role;
      var query = "UPDATE employee SET role_id= ? WHERE id = ?";
      connection.query(query,[role,employee], function(err, res) {
        if (err) throw err;
        console.log("updated succesfully")
        viewEmployees();
        runSearch();
      });
  })
};

function deleteEmployee() {
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "Enter Employee id:"
  }).then(function(answer){
      var query = "DELETE FROM employee WHERE id=? ";
      connection.query(query,[answer.id], function(err, res) {
        if (err) throw err;
        console.log("deleted succesfully")
        viewEmployees();
        runSearch();
      });
  })
};

function deleteRole() {
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "Enter Role id:"
  }).then(function(answer){
      var query = "DELETE FROM role WHERE id=? ";
      connection.query(query,[answer.id], function(err, res) {
        if (err) throw err;
        console.log("deleted succesfully")
        viewRoles();
        runSearch();
      });
  })
};

function deleteDepartment() {
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "Enter Department id:"
  }).then(function(answer){
      var query = "DELETE FROM department WHERE id=? ";
      connection.query(query,[answer.id], function(err, res) {
        if (err) throw err;
        console.log("deleted succesfully")
        viewDepartments();
        runSearch();
      });
  })
};
function deleteManager() {
  inquirer
  .prompt({
    name: "id",
    type: "input",
    message: "Enter Manager id:"
  }).then(function(answer){
      var query = "DELETE FROM manager WHERE id=? ";
      connection.query(query,[answer.id], function(err, res) {
        if (err) throw err;
        console.log("deleted succesfully")
        viewManagers();
        runSearch();
      });
  })
};