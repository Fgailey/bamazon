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
VALUES  ("DVD", "Electronics", 5, 15),
        ("USB", "Electronics", 20, 20),
        ("CD", "Electronics", 3, 12),
        ("Charger", "Electronics", 15, 19),
        ("Columbia", "Boots", 150, 3),
        ("Donner", "Boots", 130, 5),
        ("Timberland", "Boots", 90, 6),
        ("Socks", "Clothing", 10, 15),
        ("Shirts", "Clothing", 25, 13);

 

 
