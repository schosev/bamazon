# Bamazon App

### Overview

This is an Amazon-like storefront using MySQL and Node. The app will take in orders from customers and deplete stock from the store's inventory.  It will also allow a manager view the products, add to the inventory and add new products.

### Before Running the App

1. This uses the npm packages inquirer, mysql and console.table.  Run the command "npm install" on the command line to install these packages. 

2. Use the bamazon.sql file in MySQL to create and load the products table.

### Customer

**[Click Here to Watch the Demo of Customer](bamazonCustomer.js.mp4)**.

  1. Type "node bamazonCustomer.js" on the command line.
  
  2. The app will prompt the customer with two messages.

    * The first will ask for the ID of the product they would like to buy.
    * The second message will ask how many units of the product they would like to buy.

  3. Once the customer has placed the order, the application will check if the store has enough of the product to meet the customer's request.

    * If not, the app will log a message, prevent the order from going through and give the user the option
    to place another order and exit.
    * However, if the store does have enough of the product, it will fulfill the customer's order.

  4. Once the order goes through, it will show the customer the total cost of their purchase.

### Manager

**[Click Here to Watch the Demo of Manager](bamazonManager.js.mp4)**.

  1. Type "node bamazonManager.js" on the command line.

  2. The app will list a set of menu options.

    * View Products for Sale
      * If a manager selects View Products for Sale, the app will list every available item.

    * View Low Inventory
      * If a manager selects View Low Inventory, then it will list all items with an inventory count lower than five.

    * Add to Inventory
      * If a manager selects Add to Inventory, the app will display a prompt that will let the manager "add more" of any item currently in the store.

    * Add New Product
      * If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

    * Exit
      * Will exit the app.
