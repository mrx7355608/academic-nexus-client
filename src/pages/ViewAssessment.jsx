import { Box, Heading, Flex, Divider, useColorMode } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ViewAssessment() {
    const { colorMode } = useColorMode();
    const { id } = useParams();

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="80vw" mx={"auto"}>
                <Flex alignItems="center" gap="5" mb={12}>
                    <Heading fontWeight={700} fontSize={"4xl"}>
                        View Assessment {id}
                    </Heading>
                    <Divider
                        w="full"
                        bg={colorMode === "light" ? "gray" : "gray.800"}
                        rounded="full"
                        h="2px"
                    />
                </Flex>
            </Box>
        </>
    );
}
