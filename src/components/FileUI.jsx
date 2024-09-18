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
import { FaCircleArrowUp, FaCircleArrowDown } from "react-icons/fa6";

export default function FileUI({ data }) {
    const { colorMode } = useColorMode();
    return (
        <>
            <Flex alignItems={"center"}>
                <Box rounded="full" bg="purple.500" w="20px" h="20px"></Box>
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
                    {data?.upvotes.length - data?.downvotes.length}
                </Text>
            </Text>

            {/* UPVOTE AND DOWNVOTE BUTTONS */}
            <Box my={7}>
                <Button leftIcon={<FaCircleArrowUp />} colorScheme="green">
                    Upvote
                </Button>
                <Button
                    leftIcon={<FaCircleArrowDown />}
                    colorScheme={"red"}
                    mx={3}
                >
                    Downvote
                </Button>
            </Box>
        </>
    );
}
