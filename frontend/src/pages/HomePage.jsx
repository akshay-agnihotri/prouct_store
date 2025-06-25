import { toaster, Toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import { Box, Button, Card, Image, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState({ message: null });
  const products = useProductStore((state) => state.products);
  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (id) => {
    try {
      const { success, message } = await deleteProduct(id);
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
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Unable to fetch data");
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message);
        }

        useProductStore.getState().setProducts(data.data);
      } catch (err) {
        console.log(err);
        setErr({ message: err.message || "something Went wrong" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Toaster />
      {isLoading ? (
        <p>loader</p>
      ) : err.message === null ? (
        products.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "3rem 0",
            }}
          >
            <p style={{ textAlign: "center" }}>No Product Found ☹️</p>
            <Link to={"/create"} style={{ textAlign: "center" }}>
              Create a new Product 🆕
            </Link>
          </div>
        ) : (
          <>
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3 }}
              maxW="1200px"
              mx="auto"
              py={8}
            >
              {products.map((product) => (
                <Box display="flex" justifyContent="center" key={product._id}>
                  <Card.Root maxW="300px" overflow="hidden" m={3}>
                    <Image
                      src={product.image}
                      onError={(e) => {
                        // ✅ prevent infinite loop by checking if fallback already applied
                        if (
                          e.target.src !==
                          "https://via.placeholder.com/300x200?text=No+Image"
                        ) {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=No+Image";
                        }
                      }}
                      height="200px"
                      width="300px"
                      objectFit="contain"
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Text
                        textStyle="2xl"
                        fontWeight="medium"
                        letterSpacing="tight"
                        mt="2"
                      >
                        ${product.price}
                      </Text>
                    </Card.Body>
                    <Card.Footer gap="2">
                      <Button
                        onClick={() => {
                          handleDeleteProduct(product._id);
                        }}
                        variant="subtle"
                        colorPalette={"red"}
                      >
                        <MdDelete />
                      </Button>
                      <Button variant="subtle" colorPalette={"blue"}>
                        <MdOutlineUpdate />
                      </Button>
                    </Card.Footer>
                  </Card.Root>
                </Box>
              ))}
            </SimpleGrid>
          </>
        )
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "3rem 0",
          }}
        >
          <p style={{ textAlign: "center" }}>
            Unable to fetch data ☹️ {err.message}
          </p>
          <Link to={"/create"} style={{ textAlign: "center" }}>
            Create a new Product 🆕
          </Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
