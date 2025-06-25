import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log("Error in Get Products", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;

  // checking if id is valid
  if (!id || !productData || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid product ID to update",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.log("Error in Update Product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log("Error in Create Prouct", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // checking if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid product ID to delete",
    });
  }

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error in Delete Product", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
