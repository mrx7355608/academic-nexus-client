import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SortMenu() {
    const { colorMode } = useColorMode();
    const [sortOrder, setSortOrder] = useState("Newest");
    const [searchParams, _setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    return (
        <Menu>
            <MenuButton
                as={Button}
                leftIcon={<BiSortAlt2 size={17} />}
                variant="outline"
                mr={2}
                colorScheme="black"
                size="sm"
                minW="max-content"
                _hover={{
                    backgroundColor:
                        colorMode === "light" ? "#d7d7d7" : "gray.700",
                }}
            >
                {sortOrder}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => handleOnClick("Newest")}>
                    Newest
                </MenuItem>
                <MenuItem onClick={() => handleOnClick("Oldest")}>
                    Oldest
                </MenuItem>
                <MenuItem onClick={() => handleOnClick("Highest votes")}>
                    Highest votes
                </MenuItem>
            </MenuList>
        </Menu>
    );

    function handleOnClick(order) {
        setSortOrder(order);
        searchParams.set("sort", order.toLowerCase());
        const url = "/?" + searchParams.toString();
        navigate(url);
    }
}
