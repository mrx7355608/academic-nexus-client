import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    const handleGoogleSignIn = () => {
        window.open("https://www.facebook.com", "_self");
    };

    return (
        <VStack
            spacing={6}
            alignItems="start"
            justifyContent={"center"}
            h={"100vh"}
            maxWidth={"400px"}
            mx={"auto"}
        >
            <Heading size="xl" color="gray.700">
                Login
            </Heading>
            <Text>Use your university email</Text>
            <Button
                mt={7}
                leftIcon={<FcGoogle />}
                colorScheme="black"
                variant="outline"
                onClick={handleGoogleSignIn}
                size="lg"
                width="full"
                rounded={"full"}
            >
                Continue with Google
            </Button>
        </VStack>
    );
}
