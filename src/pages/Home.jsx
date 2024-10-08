import { Flex, Text, Heading, Divider, Spinner } from "@chakra-ui/react";
import FilterModal from "../components/files/FilterModal";
import SortMenu from "../components/SortMenu";
import HomeSearchbar from "../components/search/HomeSearchbar";
import { useSearchParams } from "react-router-dom";
import ErrorBoundary from "../components/main/ErrorBoundary";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import FileItem from "../components/files/FileItem";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function Home() {
    // eslint-disable-next-line
    const [sp, setSp] = useSearchParams();
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [files, setFiles] = useState([]);
    const { data, error } = useFetch(`/api/files?${sp.toString()}`);

    useEffect(() => {
        if (!data) return;

        if (data.length < 10) {
            console.log("data less");
            setHasMore(false);
        }

        console.log("data more");
        setFiles((prevFiles) => [...prevFiles, ...data]);
    }, [data]);

    const onNext = () => {
        setPage((page) => page + 1);
        sp.set("page", page);
    };

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

            {error && <ErrorMessage err={error} />}

            {data ? (
                <ErrorBoundary
                    fallback={
                        <Text color={"red.500"}>Something went wrong!</Text>
                    }
                >
                    <InfiniteScroll
                        dataLength={files.length}
                        next={onNext}
                        hasMore={hasMore}
                        loader={<Spinner marginX={"auto"} />}
                        scrollThreshold={1}
                    >
                        <FilesList files={files} />
                    </InfiniteScroll>
                </ErrorBoundary>
            ) : null}
        </>
    );
}

function FilesList({ files }) {
    return (
        <Flex flexWrap={"wrap"} gap={4} mb={20}>
            {files.map((a) => {
                return <FileItem key={a.id} data={a} />;
            })}
        </Flex>
    );
}
