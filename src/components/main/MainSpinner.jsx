import { Text, Box, useColorMode, Spinner, Flex } from "@chakra-ui/react";

export default function MainSpinner() {
    const { colorMode } = useColorMode();

    return (
        <Flex
            w="full"
            h="100vh"
            alignItems="center"
            justifyContent={"center"}
            flexDir="column"
        >
            <Box>
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
            <Flex
                alignItems="center"
                justifyContent={"center"}
                gap={3}
                mt={2}
                textColor={colorMode === "dark" ? "gray.400" : "gray.600"}
            >
                <Spinner size={"xs"} />
                <Text fontSize="sm">Loading</Text>
            </Flex>
        </Flex>
    );
}
