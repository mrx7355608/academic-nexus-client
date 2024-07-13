import {
    Box,
    Flex,
    Heading,
    Button,
    Input,
    Divider,
    useColorMode,
} from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import Navbar from "../components/Navbar";
import AssessmentList from "../components/AssessmentList";

export default function Home() {
    const { colorMode } = useColorMode();

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="80vw" mx={"auto"}>
                <Flex alignItems="center" gap="5" mb={12}>
                    <Heading fontWeight={700} fontSize={"4xl"}>
                        Home
                    </Heading>
                    <Divider
                        w="full"
                        bg={colorMode === "light" ? "gray" : "gray.800"}
                        rounded="full"
                        h="2px"
                    />
                    <Flex alignItems="center" gap={1}>
                        <Button
                            leftIcon={<BiSortAlt2 size={17} />}
                            variant="outline"
                            mr={2}
                            colorScheme="black"
                            size="sm"
                            minW="max-content"
                            _hover={{
                                backgroundColor:
                                    colorMode === "light"
                                        ? "#d7d7d7"
                                        : "gray.700",
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
                                backgroundColor:
                                    colorMode === "light"
                                        ? "#d7d7d7"
                                        : "gray.700",
                            }}
                        >
                            Filter
                        </Button>
                        <Input
                            variant="outline"
                            bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                            placeholder="Search dashboard"
                            rounded="full"
                            fontSize={"sm"}
                            w={"280px"}
                        />
                    </Flex>
                </Flex>
                <AssessmentList />
            </Box>
        </>
    );
}
