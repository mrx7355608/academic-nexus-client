import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ProfileBox from "../components/profile/ProfileBox";
import { useParams } from "react-router-dom";
import PageHeading from "../components/PageHeading";

export default function StudentProfile() {
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
                <PageHeading title={"Student Profile"} />
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
