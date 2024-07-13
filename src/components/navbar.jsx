import { Box, Flex, Input, Button, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./darkModeToggle";

export default function Navbar() {
    const { colorMode } = useColorMode();
    return (
        <Box bg="transparent" px={10} py={6}>
            <Flex alignItems="center" gap={9}>
                <Box minW="max-content">
                    <Text fontSize="xl" fontWeight={"black"} display={"inline"}>
                        academic{" "}
                    </Text>
                    <Text
                        fontSize="xl"
                        fontWeight={"black"}
                        textColor={
                            colorMode === "light" ? "purple.700" : "purple.500"
                        }
                        display={"inline"}
                    >
                        nexus.
                    </Text>
                </Box>
                <Input
                    placeholder="Search students"
                    bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                    rounded="md"
                    w={"full"}
                    fontSize="sm"
                />
                <Flex
                    alignItems={"center"}
                    gap={9}
                    fontWeight={"600"}
                    fontSize={"sm"}
                >
                    <Link to="/">Home</Link>
                    <Link to="/upload">Upload</Link>
                    <Link to="/library">Library</Link>
                    <Link to="/profile">Profile</Link>
                    <Button
                        size={"sm"}
                        rounded="8px"
                        border="2px solid"
                        borderColor="gray.700"
                        bg="transparent"
                        px={5}
                        py={4}
                    >
                        Login
                    </Button>
                    <DarkModeToggle />
                </Flex>
            </Flex>
        </Box>
    );
}
