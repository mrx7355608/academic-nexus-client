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
    Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FilterModal() {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
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

    useEffect(() => {
        if (searchParams.get("subjects")) {
            setSelectedSubjects(searchParams.get("subjects").split(","));
        }
    }, [searchParams]);

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
                                                onChange={handleOnChange}
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
        searchParams.append("subjects", selectedSubjects.join(","));
        const url = "/?" + searchParams.toString();
        navigate(url);
        onClose();
    }

    function handleOnChange(e) {
        if (selectedSubjects.includes(e.target.value)) {
            setSelectedSubjects(
                selectedSubjects.filter((s) => s != e.target.value),
            );
        } else {
            setSelectedSubjects([...selectedSubjects, e.target.value]);
        }
    }
}
