import { Flex } from "@chakra-ui/react";
import AssessmentItem from "./AssessmentItem";

export default function AssessmentList({ assessments }) {
    return (
        <Flex flexWrap={"wrap"} gap={6}>
            {assessments.map((a) => {
                return <AssessmentItem key={a._id} data={a} />;
            })}
        </Flex>
    );
}
