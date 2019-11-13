class DateFormat {
    constructor(id, name, dept, price, quantity) {
      this.id = id;
      this.name = name;
      this.dept = dept;
      this.price = price;
      this.quantity = quantity;
  
    }
    
    printBody() {
      if (this.name.length < 10) {
        let str = 10 - this.name.length
        for (let x = 0; x < str; x++) {
          this.name = this.name.concat(" ")
        }
  
      }
      if (this.dept.length < 12) {
        let str = 12 - this.dept.length
        for (let x = 0; x < str; x++) {
          this.dept = this.dept.concat(" ")
        }
  
      }
      console.log(`${this.id}  ${this.name}  ${this.dept}  $${this.price}    ${this.quantity}`)
    }
  }

  module.exports = DateFormat;