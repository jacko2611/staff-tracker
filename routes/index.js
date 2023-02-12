// Requiring packages for the application
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Creating a connection to the database
const connection = mysql.createConnection ({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "",
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

// Creating a function to prompt the user with questions
const questions = (staff) => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'staff',
                message: 'What would you like to do? (Use arrow keys to move up and down)',
                choices: [
                    "View All Employees" ,
                    "Add Employee" , 
                    "Update Employee Role" ,
                    "Search for Employee by Manager" ,
                    "Update Employee Manager" ,
                    "Delete Employee" ,
                    "View All Roles" , 
                    "Add Role" , 
                    "View All Departments" , 
                    "Add Department" , 
                    "Quit"
                ]
            }
        ])
}
then(function(answers) {
    switch(answers.action) {
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
            searchByManager();
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

// Creating a function to view all employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        questions();
        init();
    });
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
                questions();
            });
        });
        init();
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
        ]);
        then(function(answers) {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answers.role_id, answers.id], function(err, res) {
                if (err) throw err;
                console.table(res);
                questions();
            });
            init();
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
            connection.query("SELECT * FROM employee WHERE manager_id = ?", answers.manager_id, function(err, res) {
                if (err) throw err;
                console.table(res);
                questions();
            });
        });
        init();
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
                questions();
            });
        });
        init();
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
                questions();
            });
        });
        init();
    }

// Creating a function to view all roles
function viewAllRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
    init();
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
                questions();
            });
        });
        init();
}

// Creating a function to view all departments
function viewAllDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
    init();
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
                questions();
            });
        });
        init();
}

// Creating a function to initialize the application
function init() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        questions();
    });
}
