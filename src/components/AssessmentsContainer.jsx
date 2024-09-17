import { Text, Spinner, Flex } from "@chakra-ui/react";
import AssessmentList from "./AssessmentList";
import useFetch from "../hooks/useFetch";

export default function AssessmentsContainer({
    endpoint,
    credentials = false,
}) {
    const { loading, data, error } = useFetch(endpoint, credentials);

    return (
        <>
            {loading ? (
                <Flex alignItems={"center"} justifyContent="center" h={"200px"}>
                    <Spinner />
                </Flex>
            ) : error ? (
                <Text mt={5} color="red.400">
                    {error}
                </Text>
            ) : (
                <AssessmentList assessments={data} />
            )}
        </>
    );
}
