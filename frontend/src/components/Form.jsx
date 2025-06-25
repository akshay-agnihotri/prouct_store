import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";

function Form({ heading, handleAddProduct, product, setProduct, ...props }) {
  console.log(props.id);
  
  return (
    <Container mt={8} w="full" maxW="640px">
      <Toaster />
      <VStack spacing={8}>
        <Heading as="h1" size={"4xl"} textAlign={"center"} mb={8}>
          {heading}
        </Heading>

        <Box
          as="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("New Product Created:", product);
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
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={product.image}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
            <Button
              colorPalette="cyan"
              onClick={() => handleAddProduct(props.id)}
              w={"full"}
            >
              {heading}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Form;
