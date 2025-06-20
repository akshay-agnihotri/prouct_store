// const app = require('express');
import express from "express";
//import connectDB from "./config/db.js";
import { connectDB } from "./config/db.js";

const app = express();
console.log(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on http://localhost:5000");
});


