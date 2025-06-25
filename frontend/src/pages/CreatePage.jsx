import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

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
    <Container mt={8} w="full" maxW="640px">
      <Toaster />
      <VStack spacing={8}>
        <Heading as="h1" size={"4xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("New Product Created:", newProduct);
          }}
          w={"full"}
          p={6}
          bgColor={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorPalette="cyan" onClick={handleAddProduct} w={"full"}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
