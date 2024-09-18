import { Flex, Text, Heading, Divider, Spinner } from "@chakra-ui/react";
import FilterModal from "../components/files/FilterModal";
import SortMenu from "../components/SortMenu";
import HomeSearchbar from "../components/search/HomeSearchbar";
import { useSearchParams } from "react-router-dom";
import ErrorBoundary from "../components/main/ErrorBoundary";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import AssessmentItem from "../components/files/AssessmentItem";

export default function Home() {
    // eslint-disable-next-line
    const [sp, _setSp] = useSearchParams();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [files, setFiles] = useState([]);
    const { data } = useFetch(`/api/files?${sp.toString()}`);

    useEffect(() => {
        if (!data) return;

        if (data.length < 10) {
            setHasMore(false);
        }

        setFiles([...files, ...data]);
    }, [data]);

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
                <InfiniteScroll
                    dataLength={files.length}
                    next={() => {
                        setPage(page + 1);
                        sp.set("page", page);
                    }}
                    hasMore={hasMore}
                    loader={<Spinner marginX={"auto"} />}
                    scrollThreshold={0.95}
                >
                    <Flex flexWrap={"wrap"} gap={4} mb={20}>
                        {files.map((a) => {
                            return <AssessmentItem key={a.id} data={a} />;
                        })}
                    </Flex>
                </InfiniteScroll>
            </ErrorBoundary>
        </>
    );
}
