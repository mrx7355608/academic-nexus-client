import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    useColorMode,
    Text,
    Flex,
    Checkbox,
    CheckboxGroup,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function FilterModal() {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const navigate = useNavigate();
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
        <>
            <Button
                leftIcon={<LuSettings2 size={17} />}
                variant="outline"
                mr={2}
                colorScheme="black"
                size="sm"
                minW="max-content"
                onClick={onOpen}
                _hover={{
                    backgroundColor:
                        colorMode === "light" ? "#d7d7d7" : "gray.700",
                }}
            >
                Filter
            </Button>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>
                        Filter Assessments
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} p={8}>
                        <Flex
                            gap={2}
                            w={"full"}
                            flexDirection="column"
                            alignItems={"flex-start"}
                        >
                            {/* Subject Filter */}
                            <Text fontWeight={600}>Subjects</Text>
                            <CheckboxGroup
                                colorScheme="purple"
                                defaultValue={selectedSubjects}
                            >
                                <VStack
                                    direction={["column", "row"]}
                                    alignItems={"flex-start"}
                                >
                                    {subjects.map((sub) => {
                                        return (
                                            <Checkbox
                                                key={sub}
                                                value={sub}
                                                border={2}
                                                onChange={
                                                    subjectOnChangeHandler
                                                }
                                                borderColor={
                                                    colorMode === "dark"
                                                        ? "gray.400"
                                                        : "#3d3d3d"
                                                }
                                            >
                                                {sub}
                                            </Checkbox>
                                        );
                                    })}
                                </VStack>
                            </CheckboxGroup>

                            {/* Assessment type filter */}
                            <Text fontWeight={600} mt={8}>
                                Type
                            </Text>
                            <CheckboxGroup
                                colorScheme="purple"
                                defaultValue={selectedTypes}
                            >
                                <VStack
                                    direction={["column", "row"]}
                                    alignItems={"flex-start"}
                                >
                                    <Checkbox
                                        value={"quiz"}
                                        border={2}
                                        onChange={typeOnChangeHandler}
                                        borderColor={
                                            colorMode === "dark"
                                                ? "gray.400"
                                                : "#3d3d3d"
                                        }
                                    >
                                        Quiz
                                    </Checkbox>
                                    <Checkbox
                                        value={"assignment"}
                                        border={2}
                                        onChange={typeOnChangeHandler}
                                        borderColor={
                                            colorMode === "dark"
                                                ? "gray.400"
                                                : "#3d3d3d"
                                        }
                                    >
                                        Assignment
                                    </Checkbox>

                                    <Checkbox
                                        value={"proposal"}
                                        border={2}
                                        onChange={typeOnChangeHandler}
                                        borderColor={
                                            colorMode === "dark"
                                                ? "gray.400"
                                                : "#3d3d3d"
                                        }
                                    >
                                        Proposal
                                    </Checkbox>
                                    <Checkbox
                                        value={"labtask"}
                                        border={2}
                                        onChange={typeOnChangeHandler}
                                        borderColor={
                                            colorMode === "dark"
                                                ? "gray.400"
                                                : "#3d3d3d"
                                        }
                                    >
                                        Lab task
                                    </Checkbox>
                                    <Checkbox
                                        value={"report"}
                                        border={2}
                                        onChange={typeOnChangeHandler}
                                        borderColor={
                                            colorMode === "dark"
                                                ? "gray.400"
                                                : "#3d3d3d"
                                        }
                                    >
                                        Report
                                    </Checkbox>
                                </VStack>
                            </CheckboxGroup>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="purple"
                            mr={3}
                            onClick={getFilteredAssessments}
                        >
                            Filter
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

    async function getFilteredAssessments() {
        const searchParams = new URLSearchParams();

        if (selectedSubjects.length > 0) {
            searchParams.append("subjects", selectedSubjects.join(","));
        }

        if (selectedTypes.length > 0) {
            searchParams.append("types", selectedTypes.join(","));
        }

        searchParams.forEach((value, key) => {
            if (!value) {
                searchParams.delete(key);
            }
        });

        const url = "/?" + searchParams.toString();
        navigate(url);
        onClose();
    }

    function typeOnChangeHandler(e) {
        if (selectedTypes.includes(e.target.value)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== e.target.value));
        } else {
            setSelectedTypes([...selectedTypes, e.target.value]);
        }
    }
    function subjectOnChangeHandler(e) {
        if (selectedSubjects.includes(e.target.value)) {
            setSelectedSubjects(
                selectedSubjects.filter((s) => s !== e.target.value),
            );
        } else {
            setSelectedSubjects([...selectedSubjects, e.target.value]);
        }
    }
}
