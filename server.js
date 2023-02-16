// Requiring packages for the application
const inquirer = require('inquirer');
const mysql = require('mysql2');

const answers = [];

function questions(answers) {
//   console.log(`You selected: ${answers.action}`);
}

// Creating a connection to the database
const connection = mysql.createConnection ({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "obladioblada123",
    database: "employees_db"
});

// Initiating the connection
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log(`Connected as id ${connection.threadId}`);
})

console.log(`\x1b[32mWelcome to the Staff Portal!\x1b[0m`);


function init() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'staff',
          message: 'What would you like to do?',
          choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "Search for Employee by Manager",
            "Update Employee Manager",
            "Delete Employee",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
          ]
        }
      ])
      .then(function(answers) {
        switch (answers.staff) {
          case "View All Employees":
            viewAllEmployees();
            break;
  
          case "Add Employee":
            addEmployee();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
  
          case "Search for Employee by Manager":
            searchByManager();
            break;
  
          case "Update Employee Manager":
            updateEmployeeManager();
            break;
  
          case "Delete Employee":
            deleteEmployee();
            break;
  
          case "View All Roles":
            viewAllRoles();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "View All Departments":
            viewAllDepartments();
            break;
  
          case "Add Department":
            addDepartment();
            break;
  
          case "Quit":
            connection.end();
            break;
        }
      });
  }
  init();


// Creating a function to view all employees
function viewAllEmployees() {
let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    });
    init();
}

// Creating a function to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role ID of the employee?'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the manager ID of the employee?'
            }
        ])
        .then(function(answers) {
            connection.query("INSERT INTO employee SET ?", answers, function(err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
     
}

// Creating a function to update an employee's role
function updateEmployeeRole() { 
    inquirer
        .prompt([
            { 
                type: 'input',
                name: 'id',
                message: 'What is the ID of the employee you would like to update?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the new role ID of the employee?'
            }
        ])
        .then(function(answers) {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.id], function(err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
            
        });
    };

// Search for employee by manager
function searchByManager() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the manager ID of the employee?'
            }
        ])
        .then(function(answers) {
            connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id WHERE employee.manager_id = ?", answers.manager_id, function(err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
}

// Creating a function to update an employee's manager
function updateEmployeeManager() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the ID of the employee you would like to update?'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the new manager ID of the employee?'
            }
        ])
        .then(function(answers) {
            connection.query("UPDATE employee SET manager_id = ? WHERE id = ?", [answers.manager_id, answers.id], function(err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
}

// Creating a function to delete an employee
function deleteEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the ID of the employee you would like to delete?'
            }
        ])
        .then(function(answers) {
            connection.query("DELETE FROM employee WHERE id = ?", answers.id, function(err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
    }

// Creating a function to view all roles
function viewAllRoles() {
    connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id", function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

// Creating a function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID of the role you would like to add?'
            }
        ])
        .then(function(answers) {
            connection.query("INSERT INTO role SET ?", answers, function(err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
}

// Creating a function to view all departments
function viewAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    });
}

// Creating a function to add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department you would like to add?'
            }
        ])
        .then(function(answers) {
            connection.query("INSERT INTO department SET ?", answers, function(err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
}
