import React from "react";
import { Container, HStack, Text, Flex, Button, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { useColorMode } from "./ui/color-mode";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW="container.xl" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        padding={4}
        direction={{ base: "column", sm: "row" }}
      >
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "800",
                textTransform: "uppercase",
                background: "linear-gradient(to right, #00B5D8, #3182CE)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "2px",
              }}
            >
              Product Store
            </h1>
          </Link>
        </div>

        <HStack spacing={2} alignItems="center">
          <Link to="/create">
            <Button
              leftIcon={<AiOutlinePlus />}
              colorScheme="blue"
              bgColor={colorMode === "light" ? "#f0f0f0" : "#212121"}
            >
              <CiSquarePlus color={colorMode === "light" ? "black" : "white"} />
            </Button>
          </Link>

          <Button
            leftIcon={<AiOutlinePlus />}
            colorScheme="blue"
            bgColor={colorMode === "light" ? "#f0f0f0" : "#212121"}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? (
              <CiLight color={colorMode === "light" ? "black" : "white"} />
            ) : (
              <CiDark color={colorMode === "light" ? "black" : "white"} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
