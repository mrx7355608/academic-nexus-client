import { FormLabel, Box, Input } from "@chakra-ui/react";

export default function FileTitleInput({ setAssessment, colorMode }) {
    return (
        <Box w="full">
            <FormLabel>Title:</FormLabel>
            <Input
                placeholder="Title"
                bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                onChange={(e) => {
                    setAssessment((prev) => ({
                        ...prev,
                        title: e.target.value,
                    }));
                }}
            />
        </Box>
    );
}
