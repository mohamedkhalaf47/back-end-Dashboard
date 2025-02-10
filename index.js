const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const methodOverride = require('method-override')
const Customer = require("./models/schema");
require('dotenv').config()
const app = express();

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine","ejs");

mongoose.connect(process.env.DB_URL).then(() => {
  app.listen(process.env.PORT,() => {
  console.log("Database Is Connected Successfully");
})
}).catch(err => console.log(err))


// GET Requests

app.get("/",(req,res)=>{
  Customer.find()
  .then((result) => {res.render("index",{customers: result, moment:moment})})
  .catch(err => console.log(err))
})

app.get("/user/add.html",(req,res)=>{
  res.render("user/add",{userName: "Mohamed Khalaf"})
})

app.get("/edit/:id",(req,res)=>{
  Customer.findById(req.params.id)
  .then((result) => {
    res.render("user/edit",{customer: result})
  })
  .catch(err => console.log(err))
})

app.get("/user/:id",(req,res)=>{
  Customer.findById(req.params.id)
  .then((result) => {
    res.render("user/view",{customer: result, moment:moment})
  })
  .catch(err => console.log(err))
})

// POST Requests

app.post("/user/add.html" ,(req,res)=>{
  Customer.create(req.body)
  .then(() => {
    res.redirect("/")
  })
  .catch(err => console.log(err))
})

app.post("/search",(req,res) => {
  
  Customer.find({$or:[{firstName:req.body.searchText},{lastName:req.body.searchText},{gender:req.body.searchText},{country:req.body.searchText},{age:req.body.searchText}]})
  .then((result)=>{
    res.render("user/search",{customers: result, moment:moment})
  }).catch((err)=>{
    console.log(err)
  })

})

// PUT Requests
app.put("/edit/:id" ,(req,res)=>{
  Customer.updateOne({ _id: req.params.id }, req.body).then(() => {
    res.redirect("/");
  }).catch((err) => {
    console.log(err)
  })
})

// DELETE Requests
app.delete("/delete/:id" ,(req,res)=>{
  Customer.deleteOne({ _id: req.params.id })
  .then(() => {
    res.redirect("/")
  })
  .catch(err => console.log(err))
})


