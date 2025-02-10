const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  gmail: String,
  phoneNumber: String,
  age: String,
  country: String,
  gender: String,
},
{
  timestamps: true
}
)

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;