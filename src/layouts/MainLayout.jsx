import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MainSpinner from "../components/MainSpinner";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="85vw" mx={"auto"} minH="100vh">
                <Suspense fallback={<MainSpinner />}>
                    <Outlet />
                </Suspense>
            </Box>
            <Footer />
        </>
    );
}
