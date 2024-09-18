import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import AssessmentItem from "./AssessmentItem";
import useAssessments from "../states/assessments";

export default function AssessmentList({ assessments: data }) {
    const { assessments, setAssessments } = useAssessments();

    useEffect(() => {
        // Update files in zustand store, so that they
        // can be re-rendered on deleting a file
        if (data) setAssessments(data);
    }, [data]);

    return (
        <Flex flexWrap={"wrap"} gap={4} mb={20}>
            {assessments.length < 1 ? (
                <Text mt={5}>Nothing to show</Text>
            ) : (
                assessments.map((a) => {
                    return <AssessmentItem key={a.id} data={a} />;
                })
            )}
        </Flex>
    );
}
