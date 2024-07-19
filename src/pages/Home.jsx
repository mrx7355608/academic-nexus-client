import { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Divider,
    useColorMode,
    Spinner,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import AssessmentList from "../components/AssessmentList";
import useToastUtils from "../hooks/useToastUtils";
import FilterModal from "../components/Modals/FilterModal";
import { useSearchParams } from "react-router-dom";
import SortMenu from "../components/SortMenu";
import HomeSearchbar from "../components/HomeSearchbar";
import useAssessments from "../states/assessments";

export default function Home() {
    const { colorMode } = useColorMode();
    const [loading, setLoading] = useState(true);
    const { showErrorToast } = useToastUtils();
    const [searchParams, _setSearchParams] = useSearchParams();
    const { assessments, setAssessments } = useAssessments();

    useEffect(() => {
        setLoading(true);
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
                        <SortMenu />
                        <FilterModal />
                        <HomeSearchbar />
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
