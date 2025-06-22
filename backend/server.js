// const app = require('express');
import express from "express";
//import connectDB from "./config/db.js";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(express.json()); // to parse JSON bodies

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
