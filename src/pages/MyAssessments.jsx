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
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import FilterModal from "../components/Modals/FilterModal";
import { Link, useParams } from "react-router-dom";

export default function MyAssessments() {
    const { colorMode } = useColorMode();
    const [loading, setLoading] = useState(false);
    const { type } = useParams();

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
                    <FilterModal />
                </Flex>

                <Tabs>
                    <TabList>
                        <Link to="/my-assessments/assignments">
                            <Tab>Assignments</Tab>
                        </Link>

                        <Link to="/my-assessments/proposals">
                            <Tab>Proposals</Tab>
                        </Link>
                        <Link to="/my-assessments/reports">
                            <Tab>Reports</Tab>
                        </Link>
                        <Link to="/my-assessments/labtasks">
                            <Tab>Lab tasks</Tab>
                        </Link>
                        <Link to="/my-assessments/quizzes">
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
                            ) : (
                                <p>{type}</p>
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
                            ) : (
                                <p>{type}</p>
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
                            ) : (
                                <p>{type}</p>
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
                            ) : (
                                <p>{type}</p>
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
                            ) : (
                                <p>{type}</p>
                            )}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
}
