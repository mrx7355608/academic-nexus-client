import { IoMdEye } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import { Box, Flex, Text, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AssessmentItem({ data }) {
    const { colorMode } = useColorMode();

    return (
        <Box p={4} morderRadius="md" flex="1" minW={"300px"} maxW={"350px"}>
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
            <Flex mt={4} gap={3} alignItems={"center"} justifyContent={"start"}>
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
                <Button
                    px={2}
                    size={"sm"}
                    variant="ghost"
                    textDecor={"underline"}
                    color={colorMode === "light" ? "gray.700" : "gray.300"}
                    leftIcon={
                        <HiOutlineDownload
                            size={20}
                            style={{ marginRight: "-4px" }}
                        />
                    }
                    _hover={{
                        textColor: "purple.400",
                    }}
                >
                    Download
                </Button>
            </Flex>
        </Box>
    );
}
