const mysql = require("mysql")
const inquirer = require("inquirer");

let order = ""
let stock = Number
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
      // console.log(res);
      console.log(`ID Name        Department    Price  Stock`)
      for(let i = 0; i < res.length; i++){
        let data = res[i];

        let row = new dateFormat(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity)
        
        row.printBody()
      }

      purchasePrompt();
    });
  }

purchasePrompt = ()=>{
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

}

afterOrder=()=> {
    connection.query(`SELECT * FROM products WHERE item_id = ${order.id}`, function(err, res) {
      if (err) throw err;

      console.log(`ID Name        Department    Price  Stock`)
      let row = new dateFormat(res[0].item_id, res[0].product_name, res[0].department_name, res[0].price, res[0].stock_quantity)
      row.printBody()
      
      stock = res[0].stock_quantity
      if (stock < order.quantity){
        console.log("Insufficient quantity!")
      }else{
        console.log(`We have your ${res[0].product_name}('s) is/are in stock, your order is being confirmed`)
        console.log(`The total price of your order is $${res[0].price * order.quantity}`)
        stock = stock - order.quantity
        console.log(stock)
        console.log(typeof(stock))
        updateStock()
      }
      //connection.end();
    });
  }

  updateStock=()=>{
    connection.query(`UPDATE products SET stock_quantity=${stock} WHERE item_id=${order.id}`, function(err, res) {
      if (err) throw err;
      console.log(res)
    });
  }

  class Items {
    constructor (id, quantity){
        this.id = id,
        this.quantity = quantity
    }
  }
  class dateFormat{
    constructor(id, name, dept, price, quantity){
      this.id = id;
      this.name = name;
      this.dept = dept;
      this.price = price;
      this.quantity = quantity;
      
    }
    // printHead () {
    //   console.log(`ID Name  Department  Price  Stock`)
    // }
    printBody (){
      if(this.name.length < 10){
      let str = 10 - this.name.length  
      for(let x = 0; x < str; x++){
        this.name = this.name.concat(" ")
      }

      }
      if(this.dept.length < 12){
        let str = 12 - this.dept.length  
        for(let x = 0; x < str; x++){
          this.dept = this.dept.concat(" ")
        }
  
        }
      console.log(`${this.id}  ${this.name}  ${this.dept}  $${this.price}    ${this.quantity}`)
    }
  }