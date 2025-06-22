import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts); // endpoint to get all products
// endpoint to update a single product by ID
router.put("/:id", updateProduct);
router.post("/", createProduct); // endpoint to create a new product
router.delete("/:id", deleteProduct); // endpoint to delete a product by ID

export default router;
