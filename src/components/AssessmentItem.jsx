import { IoMdEye } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";
import {
    Box,
    Flex,
    Text,
    Button,
    useColorMode,
    Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useToastUtils from "../hooks/useToastUtils";
import { FaVoteYea } from "react-icons/fa";

export default function AssessmentItem({ data }) {
    const { colorMode } = useColorMode();
    const [downloading, setDownloading] = useState(false);
    const { showErrorToast } = useToastUtils();

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

            <Flex
                mt={2}
                fontSize={"sm"}
                mb={4}
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
                    onClick={() =>
                        downloadFile(
                            data.fileURL,
                            data.title + "." + data.fileExtension,
                            data.fileExtension,
                        )
                    }
                >
                    {downloading ? <Spinner size="xs" /> : "Download"}
                </Button>
            </Flex>
        </Box>
    );

    function downloadFile(secure_url, fileName, fileExtension) {
        const contentTypeMap = {
            pdf: "application/pdf",
            doc: "application/msword",
            docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            png: "image/png",
            jpg: "image/jpeg",
            jpeg: "image/jpeg",
        };

        setDownloading(true);

        fetch(secure_url, {
            headers: {
                "Content-Type": contentTypeMap[fileExtension],
            },
        })
            .then((resp) => resp.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
            })
            .catch(() => showErrorToast("Unable to download file"))
            .finally(() => setDownloading(false));
    }
}
