/* eslint-disable react/prop-types */
import { IoMdEye } from "react-icons/io";
import { Box, Flex, Text, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
import AssessmentMenu from "./AssessmentMenu";
import useUser from "../../states/user";
import { SubjectTag, Para } from "../ui";

export default function FileItem({ data, setAssessment }) {
    const { colorMode } = useColorMode();
    const user = useUser((state) => state.user);

    const isOwner = () => user?._id === data.author._id;

    return (
        <Box p={4} borderRadius="md" flex="1" minW={"350px"} maxW={"370px"}>
            {/* FILE EXTENSION PREVIEW */}
            <Flex
                justifyContent="center"
                alignItems="center"
                h="130px"
                bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                rounded="md"
            >
                <Text fontSize="xl" fontWeight="bold">
                    {data.fileExtension.toUpperCase()}
                </Text>
            </Flex>

            {/* FILE TAG & MENU */}
            <Flex
                justifyContent={"space-between"}
                alignItems="center"
                mt={2}
                mb={1}
            >
                <SubjectTag subject={data.subject} />
                {isOwner() && (
                    <AssessmentMenu
                        id={data._id}
                        setAssessment={setAssessment}
                    />
                )}
            </Flex>

            {/* FILE TITLE */}
            <Link to={`/assessment/${data.id}`}>
                <Para text={data.title} />
            </Link>

            {/* FILE DATE & AUTHOR */}
            <Text
                fontSize="sm"
                color={colorMode === "light" ? "gray.600" : "gray.400"}
                mt={0.5}
                mb={3}
            >
                Posted by{" "}
                <Text as="span" textDecor={"underline"}>
                    {data.author.fullname}
                </Text>{" "}
                - {new Date(data.createdAt).toDateString().slice(4)}
            </Text>

            {/* FILE VOTES & VIEW BUTTON */}
            <Flex
                mt={2}
                fontSize={"sm"}
                mb={1}
                color={colorMode === "light" ? "gray.600" : "gray.400"}
                gap={2}
            >
                <FaVoteYea size={20} />
                <Para text={data.upvotes.length - data.downvotes.length} />

                {/* VIEW BUTTON */}
                <Link to={`/assessment/${data.id}`}>
                    <Button
                        size={"sm"}
                        textDecor={"underline"}
                        variant="link"
                        color={colorMode === "light" ? "gray.700" : "gray.300"}
                        ml={2}
                        leftIcon={
                            <IoMdEye
                                size={18}
                                style={{ marginRight: "-3px" }}
                            />
                        }
                    >
                        View file
                    </Button>
                </Link>
            </Flex>
        </Box>
    );
}
