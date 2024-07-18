/* eslint-disable react/prop-types */
import { HStack, Text, Button, useColorMode } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Toolbar({
    pageNumber,
    numPages,
    toggleSidebar,
    setScale,
    isFullscreen,
    setIsFullscreen,
}) {
    const { colorMode } = useColorMode();
    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    return (
        <HStack
            justifyContent="space-between"
            bg={colorMode === "dark" ? "gray.700" : "gray.300"}
            p={3}
            position={"sticky"}
            top={0}
            left={0}
            zIndex={4}
            w="full"
            id="pdf-toolbar"
        >
            <HStack>
                <Button
                    size="sm"
                    variant="ghost"
                    py={5}
                    onClick={toggleSidebar}
                    isDisabled={!isFullscreen}
                >
                    <RxHamburgerMenu size={23} />
                </Button>
                <Button size="md" py={5} onClick={toggleFullscreen}>
                    {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </Button>
            </HStack>

            <Text>
                Page {pageNumber} of {numPages}
            </Text>
            <HStack>
                <Button onClick={() => setScale((prev) => prev + 0.1)}>
                    Zoom In
                </Button>
                <Button onClick={() => setScale((prev) => prev - 0.1)}>
                    Zoom Out
                </Button>
            </HStack>
        </HStack>
    );
}
