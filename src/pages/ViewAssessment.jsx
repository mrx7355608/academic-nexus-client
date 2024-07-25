import {
    Box,
    Heading,
    Flex,
    Divider,
    useColorMode,
    Spinner,
    Image,
    Text,
    Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PdfViewer from "../components/pdf-viewer/PdfViewer";
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import useToastUtils from "../hooks/useToastUtils";
import useUser from "../states/user";
import DownloadModal from "../components/Modals/DownloadModal";
import DocxViewer from "../components/DocxViewer";
import PageHeading from "../components/PageHeading";
import useFetch from "../hooks/useFetch";

export default function ViewAssessment() {
    const { colorMode } = useColorMode();
    const { id } = useParams();
    const { showErrorToast, showSuccessToast } = useToastUtils();
    const [isUpvoting, setIsUpvoting] = useState(false);
    const [isDownvoting, setIsDownvoting] = useState(false);
    const user = useUser((state) => state.user);

    const { loading, result: data, error } = useFetch(`/api/assessments/${id}`);

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <PageHeading title={"View Assessment"} />
            </Flex>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Heading textColor={"red.400"} fontSize={"xl"}>
                    {error}
                </Heading>
            ) : (
                <>
                    <Flex alignItems={"center"}>
                        <Box
                            rounded="full"
                            bg="purple.500"
                            w="20px"
                            h="20px"
                        ></Box>
                        <Divider bg="purple.500" w="20px" h="5px" mr={4} />
                        <Heading color="purple.500">{data.title}</Heading>
                    </Flex>
                    <Flex alignItems={"center"} gap={3} mt={5}>
                        <Image
                            src={data.author.profilePicture}
                            w={"35px"}
                            h={"35px"}
                            rounded="full"
                            objectFit={"cover"}
                        />
                        <Text>{data.author.fullname}</Text>
                    </Flex>
                    <Text mt={4} mb={4}>
                        Posted on:{"  "}
                        <Text
                            ml="1"
                            as="span"
                            textColor={
                                colorMode === "dark" ? "gray.400" : "gray.600"
                            }
                        >
                            {new Date(data.createdAt).toDateString().slice(4)}
                        </Text>{" "}
                    </Text>

                    <Text mt={4} mb={4}>
                        Average votes:{"  "}
                        <Text
                            ml="1"
                            as="span"
                            color={
                                data.upvotes.length - data.downvotes.length > 0
                                    ? "green"
                                    : data.upvotes.length -
                                            data.downvotes.length <
                                        0
                                      ? "red"
                                      : "gray"
                            }
                        >
                            {data.upvotes.length - data.downvotes.length}
                        </Text>
                    </Text>

                    {/* Upvot and Downvote buttons */}
                    <Box mb={12}>
                        <Button
                            leftIcon={<FaCircleArrowUp />}
                            colorScheme="green"
                            onClick={upvote}
                        >
                            {isUpvoting ? <Spinner size="sm" /> : "Upvote"}
                        </Button>
                        <Button
                            leftIcon={<FaCircleArrowDown />}
                            colorScheme={"red"}
                            mx={3}
                            onClick={downvote}
                        >
                            {isDownvoting ? <Spinner size="sm" /> : "Downvote"}
                        </Button>
                        <DownloadModal
                            id={data._id}
                            fileName={`${data.title}.${data.fileExtension}`}
                        />
                    </Box>

                    {data.fileExtension === "pdf" ? (
                        <PdfViewer id={data._id} />
                    ) : data.fileExtension === "docx" ? (
                        <DocxViewer id={data._id} />
                    ) : (
                        <Image
                            src={`${import.meta.env.VITE_SERVER_URL}/api/assessments/view-assessment/${data._id}`}
                            w="full"
                            objectFit="cover"
                            rounded="lg"
                            h={"full"}
                        />
                    )}
                </>
            )}
        </>
    );

    async function upvote() {
        if (data.upvotes.includes(user._id)) {
            showErrorToast("You have already upvoted this assessment");
            return;
        }
        try {
            setIsUpvoting(true);
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(
                `${serverURL}/api/assessments/${id}/upvote`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
            const result = await response.json();
            if (!result.ok) {
                showErrorToast(result.error);
            } else {
                showSuccessToast("You upvoted this assessment");
                setData({
                    ...data,
                    upvotes: result.data.upvotes,
                    downvotes: result.data.downvotes,
                });
            }
        } catch (err) {
            showErrorToast("An error occurred");
        } finally {
            setIsUpvoting(false);
        }
    }

    async function downvote() {
        if (data.downvotes.includes(user._id)) {
            showErrorToast("You have already downvoted this assessment");
            return;
        }
        try {
            setIsDownvoting(true);
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(
                `${serverURL}/api/assessments/${id}/downvote`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
            const result = await response.json();
            if (!result.ok) {
                showErrorToast(result.error);
            } else {
                showSuccessToast("You downvoted this assessment");
                setData({
                    ...data,
                    upvotes: result.data.upvotes,
                    downvotes: result.data.downvotes,
                });
            }
        } catch (err) {
            showErrorToast("An error occurred");
        } finally {
            setIsDownvoting(false);
        }
    }
}
