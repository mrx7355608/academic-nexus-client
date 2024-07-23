import { Button, HStack, Text, useColorMode } from "@chakra-ui/react";
import { FaGithub, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    const { colorMode } = useColorMode();

    return (
        <HStack
            p={5}
            justifyContent="center"
            alignItems="center"
            bg={colorMode === "dark" ? "gray.900" : "lightgray"}
        >
            <Text>Made with</Text>
            <HStack>
                <FaHeart color="red" />
                <Text>by</Text>
            </HStack>
            <Link
                to="https://github.com/mrx7355608"
                target={"_blank"}
                style={{ fontWeight: 600 }}
            >
                Fawad Imran
            </Link>
        </HStack>
    );
}
