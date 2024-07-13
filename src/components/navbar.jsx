import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <Box bg="transparent" px={10} py={6}>
            <Flex alignItems="center" gap={9}>
                <Box minW="max-content">
                    <Text
                        fontSize="xl"
                        fontWeight={"black"}
                        textColor={"gray.700"}
                        display={"inline"}
                    >
                        academic{" "}
                    </Text>
                    <Text
                        fontSize="xl"
                        fontWeight={"black"}
                        textColor={"purple.700"}
                        display={"inline"}
                    >
                        nexus.
                    </Text>
                </Box>
                <Input
                    placeholder="Search students"
                    bg="#d7d7d7"
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
                </Flex>
            </Flex>
        </Box>
    );
}
