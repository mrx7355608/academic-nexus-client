import { useState } from "react";
import {
    Box,
    Heading,
    Flex,
    Divider,
    Image,
    Text,
    Button,
    useColorMode,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useUser from "../../states/user";
import useToastUtils from "../../hooks/useToastUtils";
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";
import {
    upvoteAssessment,
    downvoteAssessment,
} from "../../services/assessment.services";
import FileViewer from "./FileViewer";

export default function FileUI({ data }) {
    const { id } = useParams();
    const { colorMode } = useColorMode();
    const { showErrorToast, showSuccessToast } = useToastUtils();
    const [votes, setVotes] = useState({
        upvotes: data.upvotes,
        downvotes: data.downvotes,
    });

    const user = useUser((state) => state.user);
    const [loading, setLoading] = useState({
        upvoting: false,
        downvoting: false,
    });

    return (
        <>
            {/* TITLE */}
            <Flex alignItems={"center"}>
                <Box rounded="full" bg="purple.500" w="20px" h="20px"></Box>
                <Divider bg="purple.500" w="20px" h="5px" mr={4} />
                <Heading color="purple.500">{data.title}</Heading>
            </Flex>

            {/* AUTHOR */}
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

            {/* POSTING DATE */}
            <Text mt={4} mb={4}>
                Posted on:{"  "}
                <Text
                    ml="1"
                    as="span"
                    textColor={colorMode === "dark" ? "gray.400" : "gray.600"}
                >
                    {new Date(data.createdAt).toDateString().slice(4)}
                </Text>{" "}
            </Text>

            {/* AVERAGE VOTES */}
            <Text mt={4} mb={4} fontWeight={600}>
                Average votes:{"  "}
                <Text as="span" fontWeight={400} ml={1}>
                    {votes.upvotes.length - votes.downvotes.length}
                </Text>
            </Text>

            {/* UPVOTE AND DOWNVOTE BUTTONS */}
            <Box my={7}>
                <Button
                    leftIcon={<FaCircleArrowUp />}
                    colorScheme="green"
                    onClick={upvote}
                    isLoading={loading.upvoting}
                    isDisabled={loading.upvoting}
                >
                    Upvote
                </Button>
                <Button
                    leftIcon={<FaCircleArrowDown />}
                    colorScheme={"red"}
                    mx={3}
                    onClick={downvote}
                    isLoading={loading.downvoting}
                    isDisabled={loading.downvoting}
                >
                    Downvote
                </Button>
            </Box>

            {/* FILE VIEWER */}
            <FileViewer fileURL={data.fileURL} />
        </>
    );

    async function upvote() {
        // 1. Check if user is authenticated
        if (!user) {
            return showErrorToast("Not authenticated");
        }

        // 2. Check if user has already upvoted
        const userId = user?._id;
        if (votes.upvotes.includes(userId)) {
            return showErrorToast("You have already upvoted");
        }

        // 3. Make api call, if user has not upvoted
        setLoading({ ...loading, upvoting: true });
        const { data: response, error } = await upvoteAssessment(id);
        setLoading({ ...loading, upvoting: false });

        // 4. Update votes count in file state
        setVotes({ upvotes: response.upvotes, downvotes: response.downvotes });

        return response
            ? showSuccessToast("You upvoted this file")
            : showErrorToast(error);
    }

    async function downvote() {
        // 1. Check if user is authenticated
        if (!user) {
            return showErrorToast("Not authenticated");
        }

        // 2. Check if user has already upvoted
        const userId = user?._id;
        if (votes.downvotes.includes(userId)) {
            return showErrorToast("You have already downvoted");
        }

        // 3. Make api call, if user has not upvoted
        setLoading({ ...loading, downvoting: true });
        const { data: response, error } = await downvoteAssessment(id);
        setLoading({ ...loading, downvoting: false });

        // 4. Update votes count in file state
        setVotes({ upvotes: response.upvotes, downvotes: response.downvotes });

        return response
            ? showSuccessToast("You downvoted this file")
            : showErrorToast(error);
    }
}
