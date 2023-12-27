const express = require("express");
const app = express();
const bodyparser =require("body-parser");
const path =require("path");
const mongoose  =require("mongoose");
mongoose.connect("mongodb://localhost:27017/contact", { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
   console.log("server connected");
}).catch((err)=>{
   console.log(err);
})
const port = 5000;
const hostname = "localhost";

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
   name:String, 
   phone:String,
   email:String,
   query:String
   
})

const contact = mongoose.model('contact',contactSchema);

// express specific
app.use('/static',express.static('static')) // for serving stactic file
app.use(express.urlencoded({extended:true}))

// pug specific
app.set("view engine","pug") // Set the tempelate engine as pug
app.set("views",path.join(__dirname,"views")) // set the views directory

// Endpoints
app.get("/",(req,res)=>{
 res.status(200).render("home.pug")
})

app.get("/contact",(req,res)=>{
 res.status(200).render("contact.pug")
})

app.post("/contact",(req,res)=>{
 const myData = new contact(req.body)
 myData.save().then(()=>{
   res.send("This item has been saved to the database")
 }).catch((err)=>{
res.status(400).send("Item was not saved to the database")
 })
})


app.listen(port,(req,res)=>{
   console.log(`server is listening at : http://${hostname}:${port}/ `)
})

