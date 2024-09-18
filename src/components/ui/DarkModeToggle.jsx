import { useColorMode, Button } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function DarkModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            {colorMode === "light" ? (
                <Button bg="transparent" onClick={toggleColorMode} p="0" m="-4">
                    <FaMoon />
                </Button>
            ) : (
                <Button
                    bg="transparent"
                    onClick={toggleColorMode}
                    p="0"
                    mx="-4"
                >
                    <FaSun />
                </Button>
            )}
        </>
    );
}
