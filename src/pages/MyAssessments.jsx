import { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Divider,
    useColorMode,
    Spinner,
    Tabs,
    TabPanel,
    TabPanels,
    Tab,
    TabList,
    Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { Link, useParams, useSearchParams } from "react-router-dom";
import MyAssessmentsFilterModal from "../components/Modals/MyAssessmentsFilterModal";
import AssessmentList from "../components/AssessmentList";

export default function MyAssessments() {
    const { type } = useParams();
    const { colorMode } = useColorMode();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams, _setSearchParams] = useSearchParams();
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        setLoading(true);
        fetch(
            `${serverURL}/api/assessments/my/${type}?${searchParams.toString()}`,
            {
                credentials: "include",
            },
        )
            .then((resp) => {
                if (!resp.ok) {
                    resp.json().then((result) => setError(result.error));
                    return;
                }
                return resp.json();
            })
            .then((data) => setAssessments(data.data))
            .catch(() => setError("An un-expected error occurred"))
            .finally(() => setLoading(false));

        return () => {
            setError("");
        };
    }, [type, searchParams]);

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="85vw" mx={"auto"}>
                <Flex alignItems="center" gap="5" mb={12}>
                    <Heading fontWeight={700} fontSize={"4xl"}>
                        My Assessments
                    </Heading>
                    <Divider
                        w="full"
                        bg={colorMode === "light" ? "gray" : "gray.800"}
                        rounded="full"
                        h="2px"
                        flex={1}
                    />
                    <MyAssessmentsFilterModal />
                </Flex>

                <Tabs>
                    <TabList>
                        <Link to="/my-assessments/assignment">
                            <Tab>Assignments</Tab>
                        </Link>

                        <Link to="/my-assessments/proposal">
                            <Tab>Proposals</Tab>
                        </Link>
                        <Link to="/my-assessments/report">
                            <Tab>Reports</Tab>
                        </Link>
                        <Link to="/my-assessments/labtask">
                            <Tab>Lab tasks</Tab>
                        </Link>
                        <Link to="/my-assessments/quiz">
                            <Tab>Quizzes</Tab>
                        </Link>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {loading ? (
                                <Flex
                                    alignItems={"center"}
                                    justifyContent="center"
                                    h={"200px"}
                                >
                                    <Spinner />
                                </Flex>
                            ) : error ? (
                                <Text mt={3} color="red.400">
                                    {error}
                                </Text>
                            ) : (
                                <AssessmentList assessments={assessments} />
                            )}
                        </TabPanel>

                        <TabPanel>
                            {loading ? (
                                <Flex
                                    alignItems={"center"}
                                    justifyContent="center"
                                    h={"200px"}
                                >
                                    <Spinner />
                                </Flex>
                            ) : error ? (
                                <Text mt={3} color="red.400">
                                    {error}
                                </Text>
                            ) : (
                                <AssessmentList assessments={assessments} />
                            )}
                        </TabPanel>

                        <TabPanel>
                            {loading ? (
                                <Flex
                                    alignItems={"center"}
                                    justifyContent="center"
                                    h={"200px"}
                                >
                                    <Spinner />
                                </Flex>
                            ) : error ? (
                                <Text mt={3} color="red.400">
                                    {error}
                                </Text>
                            ) : (
                                <AssessmentList assessments={assessments} />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {loading ? (
                                <Flex
                                    alignItems={"center"}
                                    justifyContent="center"
                                    h={"200px"}
                                >
                                    <Spinner />
                                </Flex>
                            ) : error ? (
                                <Text mt={3} color="red.400">
                                    {error}
                                </Text>
                            ) : (
                                <AssessmentList assessments={assessments} />
                            )}
                        </TabPanel>
                        <TabPanel>
                            {loading ? (
                                <Flex
                                    alignItems={"center"}
                                    justifyContent="center"
                                    h={"200px"}
                                >
                                    <Spinner />
                                </Flex>
                            ) : error ? (
                                <Text mt={3} color="red.400">
                                    {error}
                                </Text>
                            ) : (
                                <AssessmentList assessments={assessments} />
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
}
