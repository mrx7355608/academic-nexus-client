import { useEffect, useState } from "react";
import { Flex, Tabs, TabPanels, Tab, TabList } from "@chakra-ui/react";
import { Link, Outlet, useParams } from "react-router-dom";
import MyAssessmentsFilterModal from "../components/Modals/MyAssessmentsFilterModal";
import PageHeading from "../components/PageHeading";

export default function MyAssessments() {
    const { type } = useParams();
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
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
    }, [type]);

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
