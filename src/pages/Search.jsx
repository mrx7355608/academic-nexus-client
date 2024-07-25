import { useEffect, useState } from "react";
import {
    Flex,
    Heading,
    Divider,
    Spinner,
    useColorMode,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import useToastUtils from "../hooks/useToastUtils";
import SearchList from "../components/SearchList";

export default function Search() {
    // eslint-disable-next-line
    const [searchParams, _setSearchParams] = useSearchParams();

    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const { colorMode } = useColorMode();
    const { showErrorToast } = useToastUtils();

    useEffect(() => {
        setLoading(true);
        const serverURL = import.meta.env.VITE_SERVER_URL;
        fetch(`${serverURL}/api/students/search?${searchParams.toString()}`)
            .then((resp) => resp.json())
            .then((data) => setSearchResults(data.data))
            .catch(() => {
                showErrorToast("Unable to fetch assessments");
            })
            .finally(() => setLoading(false));
    }, [searchParams]);

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <Heading fontWeight={700} fontSize={"4xl"}>
                    Search
                </Heading>
                <Divider
                    w="full"
                    bg={colorMode === "light" ? "gray" : "gray.800"}
                    rounded="full"
                    h="2px"
                    flex="1"
                />
            </Flex>

            <Heading fontWeight={700} fontSize={"2xl"} mb={12}>
                Showing results for "{searchParams.get("sname")}"
            </Heading>

            {loading ? (
                <Flex alignItems={"center"} justifyContent="center" h={"200px"}>
                    <Spinner />
                </Flex>
            ) : (
                <SearchList searchResults={searchResults} />
            )}
        </>
    );
}
