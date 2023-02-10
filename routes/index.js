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
                message: 'What would you like to do?',
                choices: [
                    "View All Employees" ,
                    "Add Employee" , 
                    "Update Employee Role" , 
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