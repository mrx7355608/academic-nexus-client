import { Flex, Text, Heading, Divider } from "@chakra-ui/react";
import FilterModal from "../components/files/FilterModal";
import SortMenu from "../components/SortMenu";
import HomeSearchbar from "../components/search/HomeSearchbar";
import AssessmentsContainer from "../components/files/AssessmentsContainer";
import { useSearchParams } from "react-router-dom";
import ErrorBoundary from "../components/main/ErrorBoundary";

export default function Home() {
    // eslint-disable-next-line
    const [sp, _setSp] = useSearchParams();

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <Heading>Home</Heading>
                <Divider />
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
