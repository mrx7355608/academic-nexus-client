import {
    Flex,
    Heading,
    Divider,
    Spinner,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import SearchList from "../components/SearchList";
import useFetch from "../hooks/useFetch";

export default function Search() {
    // eslint-disable-next-line
    const [searchParams, _setSearchParams] = useSearchParams();
    const { colorMode } = useColorMode();
    const { loading, result, error } = useFetch(
        `/api/students/search?${searchParams.toString()}`,
    );

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
            ) : error ? (
                <Text color="red.400" mt={5}>
                    {error}
                </Text>
            ) : (
                <SearchList searchResults={result} />
            )}
        </>
    );
}
