import { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Button,
    Input,
    Divider,
    useColorMode,
    Spinner,
} from "@chakra-ui/react";
import { BiSortAlt2 } from "react-icons/bi";
import Navbar from "../components/Navbar";
import AssessmentList from "../components/AssessmentList";
import useToastUtils from "../hooks/useToastUtils";
import FilterModal from "../components/Modals/FilterModal";
import { useSearchParams } from "react-router-dom";

export default function Home() {
    const { colorMode } = useColorMode();
    const [loading, setLoading] = useState(true);
    const [assessments, setAssessments] = useState([]);
    const { showErrorToast } = useToastUtils();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        fetch(`${serverURL}/api/assessments?${searchParams.toString()}`)
            .then((resp) => resp.json())
            .then((data) => setAssessments(data.data))
            .catch(() => {
                showErrorToast("Unable to fetch assessments");
            })
            .finally(() => setLoading(false));
    }, [searchParams]);

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="85vw" mx={"auto"}>
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
                        <FilterModal />
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
                {loading ? (
                    <Flex
                        alignItems={"center"}
                        justifyContent="center"
                        h={"200px"}
                    >
                        <Spinner />
                    </Flex>
                ) : (
                    <AssessmentList assessments={assessments} />
                )}
            </Box>
        </>
    );
}
