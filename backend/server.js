// const app = require('express');
import express from "express";
//import connectDB from "./config/db.js";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json()); // to parse JSON bodies

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server is running on http://localhost:5000");
});
