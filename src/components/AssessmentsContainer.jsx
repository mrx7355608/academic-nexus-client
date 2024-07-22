import { useState, useEffect } from "react";
import { Text, Spinner, Flex } from "@chakra-ui/react";
import AssessmentList from "./AssessmentList";

export default function AssessmentsContainer({ url }) {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => setAssessments(data.data))
            .catch(() => setError("Unable to fetch assessments"))
            .finally(() => setLoading(false));
    }, [url]);

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
                <AssessmentList assessments={assessments} />
            )}
        </>
    );
}
