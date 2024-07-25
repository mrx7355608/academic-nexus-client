import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="85vw" mx={"auto"} minH="100vh">
                <Outlet />
            </Box>
            <Footer />
        </>
    );
}
