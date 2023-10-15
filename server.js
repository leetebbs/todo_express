const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// connect to the database then start the server
async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
  console.log("connected to db");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main().catch(console.error);

//mongoose models
const User = require("./Model/User.js");
const Todo = require("./Model/Todo.js");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.post("/newUser", async (req, res) => {
  try {
    const isEmail = await User.findOne({ email: req.body.email });
    const isUser = await User.findOne({ name: req.body.name });
    if (isEmail) {
      console.log("Email already exists");
      return res.status(400).json({ message: "Email already registered" });
    } else if (isUser) {
      console.log("User already exists");
      return res.status(400).json({ message: "Username already taken" });
    }
    const user = await User.create(req.body);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/addtodo", async (req, res) => {
  try {
    
    const newTodo = await Todo.create(req.body);
    console.log(newTodo);
    res.status(200).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  } 
});

app.post("/fetchtodo", async (req, res) => {
  try {
    
    // const fetchTodo = await Todo.find(req.body);
   const fetchTodo = await Todo.find({ userId: req.body.userId }).exec();
    console.log("fetch",fetchTodo);
    res.status(200).json(fetchTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  } 
});


app.post("/deletetodo", async (req, res) => {
  try {
  
   const deleteTodo = await Todo.deleteOne({ _id: req.body.index }).exec();
    // console.log(req.body.index);
    res.status(200).json(deleteTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  } 
});


app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
   const checkUser = await User.find({ name: username}).exec();
  console.log(checkUser);
  if(checkUser[0].password === password){
    res.status(200).json(checkUser[0]._id);
  }else{
    res.status(401).json({ message: "Invalid credentials" });
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  } 
});
