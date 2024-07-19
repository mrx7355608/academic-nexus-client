import { Input, useColorMode } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

export default function HomeSearchbar() {
    const { colorMode } = useColorMode();
    const [searchParams, _setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleOnChange = useDebouncedCallback((value) => {
        searchParams.set("s", value);

        // Remove empty values
        searchParams.forEach((val, key) => {
            if (!val) {
                searchParams.delete(key);
            }
        });

        const url = "/?" + searchParams.toString();
        navigate(url);
    }, 800);

    return (
        <Input
            variant="outline"
            bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
            placeholder="Search dashboard"
            rounded="full"
            fontSize={"sm"}
            w={"280px"}
            onChange={(e) => handleOnChange(e.target.value)}
        />
    );
}
