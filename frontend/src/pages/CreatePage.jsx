import { useProductStore } from "@/store/product";
import React, { useState } from "react";
import Form from "../components/Form.jsx";
import { toaster } from "@/components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProducts } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProducts(newProduct);
    if (!success) {
      toaster.create({
        title: message,
        type: "error",
      });
    } else {
      toaster.create({
        title: message,
        type: "success",
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
    console.log("success:", success);
    console.log("message:", message);
  };

  return (
    <Form
      heading="Create New Product"
      product={newProduct}
      setProduct={setNewProduct}
      handleAddProduct={handleAddProduct}
    />
  );
};

export default CreatePage;
