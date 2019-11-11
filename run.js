const mysql = require("mysql")
const inquirer = require("inquirer");


let order = ""
let db = 
{
    host: "localhost",
    port: "3307",
    user: "root",
    password: "docker",
    database: "bamazon"
}

let connection = mysql.createConnection(db)

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });

  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
  
    });
  }


  class Items {
    constructor (id, quantity){
        this.id = id,
        this.quantity = quantity
    }
  }

inquirer.prompt([
    {
        name: "id",
        message: "What is the id of the Item you are looking for?",
    },
    {
        name: "quantity",
        message: "How many of this Item do you want?",
    }
]).then(function(response){
    // console.log(response)
    order = new Items(response.id, response.quantity)
    console.log(order)
    afterOrder()
})

function afterOrder() {
    connection.query(`SELECT * FROM products WHERE item_id = ${order.id}`, function(err, res) {
      if (err) throw err;
      console.log(res);
  
      connection.end();
    });
  }
