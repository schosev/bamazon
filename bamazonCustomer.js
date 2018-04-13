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
    displayProducts();
  });

  function displayProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    // console.log("Item ID | Product Name  | Department Name  | Price  | In Stock");
    // for (var i = 0; i < res.length; i++) {
    //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    // }
    //     console.log("-----------------------------------");
        buyProduct();
  });
}

function buyProduct() {
    inquirer.prompt ([
        {
            name: "productId",
            message: "Please enter Product ID"
        }, {
            name: "quantity",
            message: "How many would you like to purchase?"
        }
    ]).then(function(response) {
        var selectedId = response.productId;
        var selectedAmt = response.quantity;
        //take productId and query the mysql table.
        connection.query("SELECT stock_quantity, price FROM products WHERE item_id=?", selectedId, function(err, res) {
            if (err) throw err;

            var inStock = res[0].stock_quantity;
            var price = res[0].price;
            if (selectedAmt <= inStock) {
                var newQuantity = inStock - selectedAmt;
                var total = price * selectedAmt;
                updateTable(selectedId, newQuantity, total);
            } else {
                console.log("You tried to purchase more than is in stock.");
                console.log("-----------------------------------");
                displayProducts();
            }
          });
    });
}

function updateTable(itemID, updateQuantity, total) {
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: updateQuantity
          },
          {
            item_id: itemID
          }
        ],
        function(error) {
          if (error) throw err;
          console.log("Total Purchase Amount: " + total);
          connection.end();
        }
      );
}



