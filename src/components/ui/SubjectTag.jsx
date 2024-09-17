import { Text } from "@chakra-ui/react";

export default function SubjectTag({ subject, colorMode }) {
    return (
        <Text
            fontSize="xs"
            fontWeight="medium"
            borderWidth={1}
            borderColor={"gray.500"}
            px={2}
            py={0.5}
            w={"max-content"}
            color={colorMode === "light" ? "gray.700" : "gray.400"}
        >
            {subject}
        </Text>
    );
}
