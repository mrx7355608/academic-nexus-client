import { Box, Flex, Heading, Button, Input, Divider } from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import Navbar from "../components/navbar";

export default function Home() {
    return (
        <>
            <Navbar />
            <Box bg="white" p={4} mt={8} maxW="80vw" mx={"auto"}>
                <Flex alignItems="center" gap="5">
                    <Heading
                        textColor={"gray.800"}
                        fontWeight={700}
                        fontSize={"4xl"}
                    >
                        Home
                    </Heading>
                    <Divider w="full" bg="gray" rounded="full" h="2px" />
                    <Flex alignItems="center" gap={1}>
                        <Button
                            leftIcon={<BiSortAlt2 size={17} />}
                            variant="outline"
                            mr={2}
                            colorScheme="black"
                            size="sm"
                            minW="max-content"
                            _hover={{
                                backgroundColor: "#d7d7d7",
                            }}
                        >
                            Sort
                        </Button>
                        <Button
                            leftIcon={<LuSettings2 size={17} />}
                            variant="outline"
                            mr={2}
                            colorScheme="black"
                            size="sm"
                            minW="max-content"
                            _hover={{
                                backgroundColor: "#d7d7d7",
                            }}
                        >
                            Filter
                        </Button>
                        <Input
                            variant="outline"
                            bg="#d7d7d7"
                            placeholder="Search dashboard"
                            rounded="full"
                            fontSize={"sm"}
                            w={"280px"}
                        />
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
