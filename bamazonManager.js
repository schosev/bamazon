var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable = require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "odessa01",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    mngrStart();
  });

  function mngrStart() {
    inquirer
      .prompt({
        name: "mngrSelect",
        type: "rawlist",
        message: "Please select one of the following options.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.mngrSelect.toUpperCase() === "VIEW PRODUCTS FOR SALE") {
            forSale();
        }
        else if (answer.mngrSelect.toUpperCase() === "VIEW LOW INVENTORY") {
            lowInventory();
        }
        else if (answer.mngrSelect.toUpperCase() === "ADD TO INVENTORY") {
            addInventory();
        }
        else if (answer.mngrSelect.toUpperCase() === "ADD NEW PRODUCT") {
            newProduct();
        }
        else if (answer.mngrSelect.toUpperCase() === "EXIT") {
            connection.end();
        }
      });
  }

  function forSale() {
    //connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        mngrStart();
      });
  }

  function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function(err, res) {
        if (err) throw err;

        console.table(res);
        mngrStart();
      });
  }

  function addInventory() {
    inquirer
    .prompt([
        {
            name: "productId",
            message: "Please enter Product ID you want to add inventory to"
        },
        {
            name: "inventoryAmt",
            type: "input",
            message: "How much would you like to add to the inventory?",
            validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
            }
        }
    ])
    .then(function(answer) {
        //need to select based on item_id
        connection.query("SELECT * FROM products WHERE item_id=?", answer.productId, function(err, res) {
            if (err) throw err;
            var totalProduct = parseInt(answer.inventoryAmt) + parseInt(res[0].stock_quantity);
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: totalProduct
                },
                {
                    item_id: answer.productId
                }
                ],
                function(error) {
                if (error) throw error;
                mngrStart();
                }
            );
        });
    });
  }

  function newProduct() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the name of the product?"
        },
        {
          name: "department",
          type: "input",
          message: "Which department is it in?"
        },
        {
          name: "price",
          type: "input",
          message: "What is the price of the product?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
            name: "quantity",
            type: "input",
            message: "How many items are in inventory?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function(err) {
            if (err) throw err;
            console.log("New product added successfully!");
            mngrStart();
          }
        );
      });
  }