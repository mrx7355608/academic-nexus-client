import {
    Button,
    Heading,
    VStack,
    Alert,
    AlertIcon,
    AlertDescription,
    Box,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    return (
        <VStack
            spacing={6}
            alignItems="start"
            justifyContent={"center"}
            h={"60vh"}
            maxWidth={"400px"}
            mx={"auto"}
        >
            <Heading size="xl">Login</Heading>

            <Box mt={1} width="full">
                <Alert status="info" borderRadius="md" boxShadow="md" w="full">
                    <AlertIcon />
                    <Box>
                        <AlertDescription>
                            You can only login with your IU email
                        </AlertDescription>
                    </Box>
                </Alert>
            </Box>
            <a
                href={`${import.meta.env.VITE_BASE_URL}/api/auth/google`}
                style={{ width: "100%" }}
            >
                <Button
                    mt={4}
                    size="lg"
                    leftIcon={<FcGoogle size={20} />}
                    colorScheme="black"
                    variant="outline"
                    width="full"
                    rounded={"full"}
                >
                    Continue with Google
                </Button>
            </a>
        </VStack>
    );
}
