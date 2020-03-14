INSERT INTO department (name) VALUES ("accounting");
INSERT INTO department (name) VALUES ("engineering");
INSERT INTO department (name) VALUES ("sales");

INSERT INTO role (title, salary, department_id) VALUES ("auditor",60000.00,1);
INSERT INTO role (title, salary, department_id) VALUES ("software engineer",120000.00,2);
INSERT INTO role (title, salary, department_id) VALUES ("salesman",50000.00,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Seth","Greenbaum",2,1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Simone","Greenstein",1,2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Severna","Greenberg",3,3);

INSERT INTO manager (manager_name) VALUES ("Pam Cortland");
INSERT INTO manager (manager_name) VALUES ("Giovanni Stern");
INSERT INTO manager (manager_name) VALUES ("Dick Dirtley");