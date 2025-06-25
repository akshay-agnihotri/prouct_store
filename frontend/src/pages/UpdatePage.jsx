import { useState } from "react";
import Form from "../components/Form.jsx";
import { toaster, Toaster } from "@/components/ui/toaster.jsx";
import { useProductStore } from "@/store/product.js";
import { useParams } from "react-router-dom";

function UpdatePage() {
  const id = useParams().id;
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { updateProduct } = useProductStore();

  const handleUpdateProduct = async (id) => {
    const result = await updateProduct(id, updatedProduct);
    toaster.create({
      description: result.message,
      type: result.success ? "success" : "error",
    });
    setUpdatedProduct({ name: "", price: "", image: "" });
  };

  return (
    <>
      <Toaster />
      <Form
        heading={"Update Product"}
        handleAddProduct={handleUpdateProduct}
        product={updatedProduct}
        setProduct={setUpdatedProduct}
        id={id}
      ></Form>
    </>
  );
}

export default UpdatePage;
