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
    RadioGroup,
    Radio,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

export default function MyAssessmentsFilterModal() {
    const { colorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { type } = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState("All");

    const subjects = [
        "All",
        "Linear Algebra",
        "Programming Fundamentals",
        "Object Oriented Programming",
        "Data Structures & Algorithms",
        "Data Communication & Computer Networks",
        "Computer Architecture & Assembly Language",
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
                Filter Subjects
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
                            <RadioGroup
                                value={subject}
                                onChange={setSubject}
                                defaultValue="All"
                            >
                                <Stack>
                                    {subjects.map((s) => (
                                        <Radio key={s} value={s}>
                                            {s}
                                        </Radio>
                                    ))}
                                </Stack>
                            </RadioGroup>
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

        if (subject && subject !== "All") {
            searchParams.set("subject", subject);
        }

        searchParams.forEach((value, key) => {
            if (!value) {
                searchParams.delete(key);
            }
        });

        const url = `/my-assessments/${type}?` + searchParams.toString();
        navigate(url);
        onClose();
    }
}
