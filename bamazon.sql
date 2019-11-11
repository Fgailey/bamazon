DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iphone", "Electronics", 20, 3);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Android", "Electronics", 5, 3);
 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blackberry", "Electronics", 6, 3);
 
