import Navbar from "../components/Navbar";
import {
    Box,
    Flex,
    Heading,
    Spinner,
    Divider,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ProfileBox from "../components/profile/ProfileBox";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

export default function StudentProfile() {
    const { colorMode } = useColorMode();
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");
    const [loadingStudent, setLoadingStudent] = useState(true);

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/students/student-profile/${id}`,
        )
            .then(async (resp) => {
                if (resp.ok) {
                    return resp.json();
                }

                const r = await resp.json();
                throw new Error(r.error);
            })
            .then(({ data }) => setStudent(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoadingStudent(false));
    }, [id]);

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <Heading fontWeight={700} fontSize={"4xl"}>
                    Student Profile
                </Heading>
                <Divider
                    w="full"
                    bg={colorMode === "light" ? "gray" : "gray.800"}
                    rounded="full"
                    h="2px"
                    flex={1}
                />
            </Flex>

            {loadingStudent ? (
                <Spinner />
            ) : error ? (
                <Text mt={5} color="red.400">
                    {error}
                </Text>
            ) : (
                <ProfileBox user={student} />
            )}
        </>
    );
}
