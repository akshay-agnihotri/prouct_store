import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });
  console.log("New Product State:", newProduct);
  const handleAddProduct = () => {
    // Here you would typically handle the product creation logic,
    // such as sending the newProduct data to your backend API.
    console.log("Product Created:", newProduct);
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container mt={8} w="full" maxW="640px">
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
