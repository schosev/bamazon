CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	`item_id` INT(11) NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(255) NOT NULL,
    `department_name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(10,2),
    `stock_quantity` INTEGER(10),
    PRIMARY KEY (`item_id`)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("running shoes", "clothing", 150.00, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dress shoes", "clothing", 175.00, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("phone", "electronics", 500.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 1200.00, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronics", 800.00, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("polo shirt", "clothing", 19.99, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("watch", "jewelry", 45.00, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("diamond ring", "jewelry", 3000.00, 1);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("game system", "electronics", 399.99, 6);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tires", "automotive", 125.00, 4);

