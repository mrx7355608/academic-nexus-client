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
import useFetch from "../hooks/useFetch";
import useToastUtils from "../hooks/useToastUtils";
import useUser from "../states/user";
import {
    downvoteAssessment,
    upvoteAssessment,
} from "../services/assessment.services";
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import PageHeading from "../components/PageHeading";
// import PdfViewer from "../components/pdf-viewer/PdfViewer";
// import DocxViewer from "../components/DocxViewer";

export default function ViewAssessment() {
    const { colorMode } = useColorMode();
    const { id } = useParams();
    const { showErrorToast, showSuccessToast } = useToastUtils();
    const [data2, setData] = useState(null);
    const [isUpvoting, setIsUpvoting] = useState(false);
    const [isDownvoting, setIsDownvoting] = useState(false);
    const user = useUser((state) => state.user);

    const { loading, data, error } = useFetch(`/api/files/${id}`);

    useEffect(() => {
        if (data) {
            setData(data);
        }
    }, [data]);

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
                        <Heading color="purple.500">{data2.title}</Heading>
                    </Flex>
                    <Flex alignItems={"center"} gap={3} mt={5}>
                        <Image
                            src={data2.author.profilePicture}
                            w={"35px"}
                            h={"35px"}
                            rounded="full"
                            objectFit={"cover"}
                        />
                        <Text>{data2.author.fullname}</Text>
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
                            {new Date(data2.createdAt).toDateString().slice(4)}
                        </Text>{" "}
                    </Text>

                    <Text mt={4} mb={4}>
                        Average votes:{"  "}
                        <Text
                            ml="1"
                            as="span"
                            color={
                                data2?.upvotes.length -
                                    data2?.downvotes.length >
                                0
                                    ? "green"
                                    : data2?.upvotes.length -
                                            data2?.downvotes.length <
                                        0
                                      ? "red"
                                      : "gray"
                            }
                        >
                            {data2?.upvotes.length - data2?.downvotes.length}
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
                    </Box>

                    {/* File viewer */}
                    {/* {data?.fileExtension === "pdf" ? ( */}
                    {/*     <PdfViewer fileURL={result.fileURL} /> */}
                    {/* ) : data?.fileExtension === "docx" ? ( */}
                    {/*     <DocxViewer fileURL={result.fileURL} /> */}
                    {/* ) : ( */}
                    {/*     <Image */}
                    {/*         src={result.fileURL} */}
                    {/*         w="full" */}
                    {/*         objectFit="cover" */}
                    {/*         rounded="lg" */}
                    {/*         h={"full"} */}
                    {/*     /> */}
                    {/* )} */}
                </>
            )}
        </>
    );

    async function upvote() {
        if (!user) {
            showErrorToast("Please login to upvote this assessment");
            return;
        }
        if (data2.upvotes.includes(user._id)) {
            showErrorToast("You have already upvoted this assessment");
            return;
        }

        setIsUpvoting(true);
        const { error, data: result } = await upvoteAssessment(id);
        if (error) {
            showErrorToast(error);
        } else {
            showSuccessToast("You upvoted this assessment");
            setData({
                ...data2,
                upvotes: result.upvotes,
                downvotes: result.downvotes,
            });
            setIsUpvoting(false);
        }
    }

    async function downvote() {
        if (!user) {
            showErrorToast("Please login to downvote this assessment");
            return;
        }
        if (data2.downvotes.includes(user._id)) {
            showErrorToast("You have already downvoted this assessment");
            return;
        }

        setIsDownvoting(true);

        const { data: result, error } = await downvoteAssessment(id);
        if (error) {
            showErrorToast(error);
        } else {
            setData({
                ...data2,
                upvotes: result.upvotes,
                downvotes: result.downvotes,
            });
        }

        setIsDownvoting(false);
    }
}
