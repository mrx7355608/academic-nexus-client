/* eslint-disable react/prop-types */
import { IoMdEye } from "react-icons/io";
import { Box, Flex, Text, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";
import DownloadModal from "./Modals/DownloadModal";

export default function AssessmentItem({ data }) {
    const { colorMode } = useColorMode();

    return (
        <Box p={4} borderRadius="md" flex="1" minW={"350px"} maxW={"400px"}>
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
            <Text
                mt={3}
                fontSize="xs"
                fontWeight="medium"
                borderWidth={1}
                borderColor={"gray.500"}
                px={2}
                py={0.5}
                w={"max-content"}
                color={colorMode === "light" ? "gray.700" : "gray.400"}
            >
                {data.subject}
            </Text>

            <Text
                fontWeight={600}
                fontSize="md"
                mt="2"
                color={colorMode === "light" ? "gray.700" : "gray.100"}
            >
                {data.title}
            </Text>
            <Text
                fontSize="sm"
                color={colorMode === "light" ? "gray.600" : "gray.400"}
                mt={0.5}
            >
                Posted by{" "}
                <Text as="span" textDecor={"underline"}>
                    {data.author.fullname}
                </Text>{" "}
                - {new Date(data.createdAt).toDateString().slice(4)}
            </Text>

            <Flex
                mt={2}
                fontSize={"sm"}
                mb={1}
                color={colorMode === "light" ? "gray.600" : "gray.400"}
                gap={2}
            >
                <FaVoteYea size={20} />
                <Text
                    ml="1"
                    as="span"
                    color={
                        data.upvotes.length - data.downvotes.length > 0
                            ? "green"
                            : data.upvotes.length - data.downvotes.length < 0
                              ? "red"
                              : "gray"
                    }
                >
                    {data.upvotes.length - data.downvotes.length}
                </Text>
                <Text
                    ml={2}
                    fontSize="sm"
                    fontWeight="medium"
                    px={3}
                    py={0.5}
                    w={"max-content"}
                    rounded="full"
                    color={colorMode === "light" ? "gray.700" : "gray.400"}
                    bg={colorMode === "dark" ? "gray.700" : "#d7d7d7"}
                >
                    #{data.type}
                </Text>
            </Flex>

            <Flex mt={3} gap={3} alignItems={"center"} justifyContent={"start"}>
                <Link to={`/assessment/${data._id}`}>
                    <Button
                        px={2}
                        size={"sm"}
                        textDecor={"underline"}
                        variant="ghost"
                        color={colorMode === "light" ? "gray.700" : "gray.300"}
                        leftIcon={
                            <IoMdEye
                                size={20}
                                style={{ marginRight: "-2px" }}
                            />
                        }
                        _hover={{
                            textColor: "purple.400",
                        }}
                    >
                        View
                    </Button>
                </Link>
                <DownloadModal
                    id={data._id}
                    fileName={`${data.title}.${data.fileExtension}`}
                />
            </Flex>
        </Box>
    );
}
