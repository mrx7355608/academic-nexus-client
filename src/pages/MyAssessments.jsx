import { useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    Divider,
    useColorMode,
    Tabs,
    TabPanel,
    TabPanels,
    Tab,
    TabList,
} from "@chakra-ui/react";
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MyAssessmentsFilterModal from "../components/Modals/MyAssessmentsFilterModal";
import AssessmentsContainer from "../components/AssessmentsContainer";
import useUser from "../states/user";
import useToastUtils from "../hooks/useToastUtils";

export default function MyAssessments() {
    const { type } = useParams();
    const { colorMode } = useColorMode();
    const [sp, _setSearchParams] = useSearchParams();
    const user = useUser((state) => state.user);
    const navigate = useNavigate();
    const { showErrorToast } = useToastUtils();

    useEffect(() => {
        if (!user) {
            showErrorToast("Please login to continue");
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="85vw" mx={"auto"} minH="100vh">
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
                            <AssessmentsContainer
                                endpoint={`/api/assessments/my/${type}?${sp.toString()}`}
                                credentials={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AssessmentsContainer
                                endpoint={`/api/assessments/my/${type}?${sp.toString()}`}
                                credentials={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AssessmentsContainer
                                endpoint={`/api/assessments/my/${type}?${sp.toString()}`}
                                credentials={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AssessmentsContainer
                                endpoint={`/api/assessments/my/${type}?${sp.toString()}`}
                                credentials={true}
                            />
                        </TabPanel>
                        <TabPanel>
                            <AssessmentsContainer
                                endpoint={`/api/assessments/my/${type}?${sp.toString()}`}
                                credentials={true}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            <Footer />
        </>
    );
}
