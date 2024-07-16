import { VStack, Text } from "@chakra-ui/react";
import SearchItem from "./SearchItem";

export default function SearchList({ searchResults }) {
    return (
        <VStack gap={8}>
            {searchResults.length > 0 ? (
                searchResults.map((d) => <SearchItem key={d._id} student={d} />)
            ) : (
                <Text size={"md"}>No results found</Text>
            )}
        </VStack>
    );
}
