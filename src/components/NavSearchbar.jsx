import { Input, Button, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavSearchbar() {
    const { colorMode } = useColorMode();
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    return (
        <form
            onSubmit={handleOnSubmit}
            style={{ position: "relative", flex: 1 }}
        >
            <Input
                placeholder="Search students"
                bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                rounded="md"
                fontSize="sm"
                onChange={handleOnChange}
                size={"lg"}
            />
            <Button
                type="submit"
                variant="ghost"
                pos={"absolute"}
                top={0}
                right={0}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
                h={"full"}
                zIndex={4000}
                _hover={{
                    background: colorMode === "dark" ? "gray.600" : "#c7c7c7",
                }}
            >
                <FaSearch size={13} />
            </Button>
        </form>
    );

    function handleOnChange(e) {
        setValue(e.target.value);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        navigate(`/search?sname=${value}`);
    }
}
