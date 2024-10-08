import {
    Button,
    Box,
    Menu,
    FormLabel,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { memo, useState } from "react";
import { FaBook } from "react-icons/fa";

export default memo(function SubjectMenu({
    setAssessment,
    colorMode,
    defaultSubject,
}) {
    const [selectedSubject, setSelectedSubject] = useState(null);
    const subjects = [
        "Linear Algebra",
        "Programming Fundamentals",
        "Object Oriented Programming",
        "Data Structures & Algorithms",
        "Data Communication & Computer Networks",
        "Funtional English",
        "Applied Physics",
        "Computer Architecture & Assembly Language",
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
                    {defaultSubject || selectedSubject || "No subject selected"}
                </MenuButton>
                <MenuList>
                    {subjects.map((subject) => {
                        return (
                            <MenuItem
                                key={subject}
                                onClick={() => onClickHandler(subject)}
                            >
                                {subject}
                            </MenuItem>
                        );
                    })}
                </MenuList>
            </Menu>
        </Box>
    );

    function onClickHandler(subject) {
        setSelectedSubject(subject);
        setAssessment((prev) => ({
            ...prev,
            subject: subject,
        }));
    }
});
