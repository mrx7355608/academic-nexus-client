import { Text } from "@chakra-ui/react";

export default function Para({ text, colorMode }) {
    return (
        <Text
            fontWeight={600}
            color={colorMode === "light" ? "gray.700" : "gray.100"}
        >
            {text}
        </Text>
    );
}
