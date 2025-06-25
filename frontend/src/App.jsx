import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Box minHeight="100vh">
        <Navbar />
        <Outlet /> {/* This will render child routes */}
      </Box>
    </>
  );
}

export default App;
