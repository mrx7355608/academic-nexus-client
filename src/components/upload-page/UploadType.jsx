import { FormLabel, Box, RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { useState } from "react";

export default function UploadType({ setAssessment }) {
    const [value, setValue] = useState("quiz");

    return (
        <Box>
            <FormLabel>Select Upload Type:</FormLabel>
            <RadioGroup
                onChange={(e) => {
                    setValue(e);
                    setAssessment((prev) => ({ ...prev, type: e }));
                }}
                value={value}
            >
                <Stack direction="column">
                    <Radio value="quiz">Quiz</Radio>
                    <Radio value="assignment">Assignment</Radio>
                </Stack>
            </RadioGroup>
        </Box>
    );
}
