import {
    Button,
    Box,
    Menu,
    FormLabel,
    MenuButton,
    MenuList,
    MenuItem,
    useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaBook } from "react-icons/fa";

export default function SubjectMenu({ setAssessment }) {
    const { colorMode } = useColorMode();
    const [selectedSubject, setSelectedSubject] = useState(null);
    const subjects = [
        "Linear Algebra",
        "Programming Fundamentals",
        "Object Oriented Programming",
        "Data Structures & Algorithms",
        "Funtional English",
        "Applied Physics",
        "Web Programming",
        "Personal Development",
        "Philosophy and Critical Thinking",
        "Digital Logic Design",
    ];
    return (
        <Box w="full">
            <FormLabel>Select Subject:</FormLabel>
            <Menu w="full">
                <MenuButton
                    as={Button}
                    leftIcon={<FaBook size={22} />}
                    w="full"
                    bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                >
                    {selectedSubject || "No subject selected"}
                </MenuButton>
                <MenuList>
                    {subjects.map((subject) => {
                        return (
                            <MenuItem
                                key={subject}
                                onClick={() => {
                                    setSelectedSubject(subject);
                                    setAssessment((prev) => ({
                                        ...prev,
                                        selectedSubject: subject,
                                    }));
                                }}
                            >
                                {subject}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </Box>
    );
}
