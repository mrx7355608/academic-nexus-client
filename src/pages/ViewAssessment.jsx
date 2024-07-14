import {
    Box,
    Heading,
    Flex,
    Divider,
    useColorMode,
    Spinner,
    Image,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PdfViewer from "../components/PdfViewer";

export default function ViewAssessment() {
    const { colorMode } = useColorMode();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/assessments/${id}`)
            .then((resp) => resp.json())
            .then((result) => {
                if (result.ok) {
                    console.log(result.data);
                    setData(result.data);
                } else {
                    setError(result.error);
                }
            })
            .catch(() => setError("An unexpected error occurred"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="80vw" mx={"auto"}>
                <Flex alignItems="center" gap="5" mb={12}>
                    <Heading fontWeight={700} fontSize={"4xl"}>
                        View Assessment
                    </Heading>
                    <Divider
                        flex={1}
                        bg={colorMode === "light" ? "gray" : "gray.800"}
                        rounded="full"
                        h="2px"
                    />
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
                        <Text mt={4} mb={12}>
                            Posted on:{"  "}
                            <Text ml="1" as="span" textColor={"gray.400"}>
                                {new Date(data.createdAt)
                                    .toDateString()
                                    .slice(4)}
                            </Text>{" "}
                        </Text>
                        {data.fileExtension === "pdf" ? (
                            <PdfViewer pdfUrl={data.fileURL} />
                        ) : data.fileExtension === "docx" ? null : (
                            <Image
                                src={data.fileURL}
                                w="full"
                                objectFit="cover"
                                rounded="lg"
                                h={"full"}
                            />
                        )}
                    </>
                )}
            </Box>
        </>
    );
}
