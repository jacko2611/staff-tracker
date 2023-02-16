INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rose", "Green", 01, 1),
       ("Esther", "Kent", 02, 1),
       ("Jane", "Doe", 03, 3),
       ("John", "Doe", 04, 6),
       ("John", "Smith", 05, 4),
       ("Jane", "Smith", 06, 2),
       ("Jaye", "Green", 07, 1),
       ("Mathew", "Nichols", 07, 1);
       
INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Finance"),
       ("Human Resources"),
       ("Legal"),
       ("Engineering"),
       ("Quality Assurance"),
       ("Customer Service");

INSERT INTO role (title, salary, department_name)
VALUES ("Sales Lead", 100000, "Sales"),
       ("Salesperson", 80000, "Sales"),
       ("Lead Engineer", 120000, "Engineering"),
       ("Software Engineer", 100000, "Engineering"),
       ("Account Manager", 80000, "Sales"),
       ("Accountant", 65000, "Finance"),
       ("Legal Team Lead", 80000, "Legal"),
       ("Lawyer", 60000, "Legal");

SELECT salary, title, department_name, first_name, last_name
FROM role
INNER JOIN employee ON role.id = employee.role_id
