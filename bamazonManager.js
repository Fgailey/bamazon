const mysql = require("mysql")
const inquirer = require("inquirer");
const dateFormat = require("./dateFormat")

let db = {
    host: "localhost",
    port: "3307",
    user: "root",
    password: "docker",
    database: "bamazon"
}

let connection = mysql.createConnection(db)

inquirer.prompt([{
    type: "checkbox",
    name: "option",
    message: "list",
    choices: [
        "View Products for Sale",
        new inquirer.Separator(),
        "View Low Inventory",
        new inquirer.Separator(),
        "Add to Inventory",
        new inquirer.Separator(),
        "Add New Product"
    ]
}]).then(function (res) {
    console.log(res)
    switch (res.option[0]) {
        case "View Products for Sale":
            productsForSale()
            break;
        case "View Low Inventory":
            lowInventory()
            break;
        case "Add to Inventory":
            addToInventory()
            break;
        case "Add New Product":
            addNewProduct()
            break;

    }
})


productsForSale = () => {
    console.log("1")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(`ID Name        Department    Price  Stock`)
        console.log("-----------------------------------------")
        for (let i = 0; i < res.length; i++) {
            let data = res[i];
            let row = new dateFormat(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity)
            row.printBody()
        }
        console.log("=========================================")
    });

}
lowInventory = () => {
    console.log("2")
    connection.query("SELECT * FROM products WHERE stock_quantity<5", function (err, res) {
        if (err) throw err;
        console.log(`ID Name        Department    Price  Stock`)
        console.log("-----------------------------------------")
        for (let i = 0; i < res.length; i++) {
            let data = res[i];
            let row = new dateFormat(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity)
            row.printBody()
        }
        console.log("=========================================")
    });
}
addToInventory = () => {
    console.log("3")
    addInviPrompt()

}
addNewProduct = () => {
    console.log("4")
    addNewItem()
}


addInviPrompt = () => {
    inquirer.prompt([{
            name: "id",
            message: "What is the ID off the product you are adding?"
        },
        {
            name: "quan",
            message: "How many items are you adding"
        }
    ]).then(function (data) {
        connection.query(`UPDATE products SET stock_quantity=stock_quantity + ${data.quan} WHERE item_id=${data.id}`, function (err, res) {
            if (err) throw err;
            console.log("updated table")
        })

        connection.query(`SELECT * FROM products WHERE item_id=${data.id}`, function (err, res) {
            if (err) throw err;
            console.log(`ID Name        Department    Price  Stock`)
            console.log("-----------------------------------------")
            for (let i = 0; i < res.length; i++) {
                let data = res[i];
                let row = new dateFormat(data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity)
                row.printBody()
            }
            console.log("=========================================")
        })

        console.log('add to invin')
    })
}

addNewItem = () => {
    inquirer.prompt([{
            name: "name",
            message: "What is the product name?"
        },
        {
            name: "dept",
            message: "What is the department name?"

        },
        {
            name: "price",
            message: "What is the products price?"

        },
        {
            name: "quantity",
            message: "How many of this Item are in stock?"

        }
    ]).then(function (data) {
        connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) \n
        VALUES('${data.name}', '${data.dept}', ${data.price}, ${data.quantity})`, function (err, res) {
            if (err) throw err;
            // console.log("yes")
            // console.log(data)
            // console.log(res)
        })

    })
}