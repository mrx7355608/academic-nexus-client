import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ProfileBox from "../components/profile/ProfileBox";
import { useParams } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import useFetch from "../hooks/useFetch";

export default function StudentProfile() {
    const { id } = useParams();
    const { loading, result, error } = useFetch(
        `/api/students/student-profile/${id}`,
    );

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <PageHeading title={"Student Profile"} />
            </Flex>

            {loading ? (
                <Spinner />
            ) : error ? (
                <Text mt={5} color="red.400">
                    {error}
                </Text>
            ) : (
                <ProfileBox user={result} />
            )}
        </>
    );
}
