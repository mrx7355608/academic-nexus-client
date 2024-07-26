import { Flex, Text } from "@chakra-ui/react";
import AssessmentItem from "./AssessmentItem";

export default function AssessmentList({ assessments }) {
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
