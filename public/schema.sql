DROP DATABASE IF EXISTS budgetTracker_db;

CREATE DATABASE budgetTracker_db;

USE budgetTracker_db;
-- Table to keep track of Expenses and income
CREATE TABLE expenses
(id int NOT NULL AUTO_INCREMENT,
expense_name varchar(255) NOT NULL,
amount int NOT NULL,
category_id int NOT NULL,
date date NOT NULL,
user_id int NOT NULL,
PRIMARY KEY (id)
FOREIGN KEY (category_id) REFERENCES category(id)
);


-- CREATE TABLE category
-- (id int NOT NULL AUTO_INCREMENT,
-- category_name varchar(255) NOT NULL,
-- categoryType varchar(100), 
-- user_id int NOT NULL,
-- PRIMARY KEY (id)
-- );

-- CREATE TABLE users
-- (id int NOT NULL AUTO_INCREMENT,
-- email varchar(255) NOT NULL,
-- password varchar(255) NOT NULL,
-- createdAt date NULL,
-- updatedAt date NULL,
-- PRIMARY KEY (id)
-- );

-- CREATE TABLE bill_pay
-- (id int NOT NULL AUTO_INCREMENT,
-- bill_name varchar(255) NOT NULL,
-- website varchar(255),
-- due_date date,
-- user_id int NOT NULL,
-- PRIMARY KEY (id)
-- );

