import { useEffect, useState } from "react";
import { Flex, Tabs, TabPanels, Tab, TabList } from "@chakra-ui/react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import MyAssessmentsFilterModal from "../components/Modals/MyAssessmentsFilterModal";
import useUser from "../states/user";
import useToastUtils from "../hooks/useToastUtils";
import PageHeading from "../components/PageHeading";

export default function MyAssessments() {
    const { showErrorToast } = useToastUtils();
    const { type } = useParams();
    const [tabIndex, setTabIndex] = useState(0);
    const user = useUser((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            showErrorToast("Please login to continue");
            navigate("/");
        }

        switch (type) {
            case "assignment":
                setTabIndex(0);
                break;

            case "proposal":
                setTabIndex(1);
                break;

            case "report":
                setTabIndex(2);
                break;

            case "labtask":
                setTabIndex(3);
                break;

            case "quiz":
                setTabIndex(4);
                break;

            default:
                setTabIndex(0);
                break;
        }
    }, [user, type]);

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <PageHeading title={"My Assessments"} />
                <MyAssessmentsFilterModal />
            </Flex>

            <Tabs index={tabIndex}>
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
                    <Outlet />
                </TabPanels>
            </Tabs>
        </>
    );
}
