import { Box, Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    const handleGoogleSignIn = () => console.log("hello");

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center" p={4}>
            <Box
                p={8}
                maxWidth="400px"
                width="full"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                bg="whiteAlpha.900"
                textAlign="center"
            >
                <VStack spacing={6}>
                    <Heading size={22} color="teal.500">
                        Academic Nexus
                    </Heading>
                    <Heading size="md" color="gray.700">
                        Login
                    </Heading>
                    <Button
                        leftIcon={<FcGoogle />}
                        colorScheme="teal"
                        variant="outline"
                        onClick={handleGoogleSignIn}
                        size="lg"
                        width="full"
                    >
                        Continue with Google
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
}
