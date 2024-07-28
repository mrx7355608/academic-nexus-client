import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import AssessmentItem from "./AssessmentItem";
import useAssessments from "../states/assessments";

export default function AssessmentList({ assessments: data }) {
    const { assessments, setAssessments } = useAssessments();

    useEffect(() => {
        if (data) setAssessments(data);
    }, [data]);
    return (
        <Flex flexWrap={"wrap"} gap={4} mb={20}>
            {assessments.length > 0 ? (
                assessments.map((a) => {
                    return <AssessmentItem key={a._id} data={a} />;
                })
            ) : (
                <Text mt={5}>Nothing to show</Text>
            )}
        </Flex>
    );
}
