import {
    Button,
    Heading,
    VStack,
    useColorMode,
    Alert,
    AlertIcon,
    AlertDescription,
    Box,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    const handleGoogleSignIn = () => {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        window.open(`${serverURL}/api/auth/google`, "_self");
    };

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
            <Button
                mt={4}
                size="lg"
                leftIcon={<FcGoogle size={20} />}
                colorScheme="black"
                variant="outline"
                onClick={handleGoogleSignIn}
                width="full"
                rounded={"full"}
            >
                Continue with Google
            </Button>
        </VStack>
    );
}
