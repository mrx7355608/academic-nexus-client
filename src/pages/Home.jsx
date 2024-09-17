import { Flex, Text } from "@chakra-ui/react";
import FilterModal from "../components/Modals/FilterModal";
import SortMenu from "../components/SortMenu";
import HomeSearchbar from "../components/HomeSearchbar";
import AssessmentsContainer from "../components/AssessmentsContainer";
import { useSearchParams } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import ErrorBoundary from "../components/ErrorBoundary";

export default function Home() {
    // eslint-disable-next-line
    const [sp, _setSp] = useSearchParams();

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <PageHeading title="Home" />
                <Flex alignItems="center" gap={1}>
                    <SortMenu />
                    <FilterModal />
                    <HomeSearchbar />
                </Flex>
            </Flex>

            <ErrorBoundary
                fallback={<Text color={"red.500"}>Something went wrong!</Text>}
            >
                <AssessmentsContainer
                    endpoint={`/api/files?${sp.toString()}`}
                />
            </ErrorBoundary>
        </>
    );
}
