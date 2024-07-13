import { Flex } from "@chakra-ui/react";
import AssessmentItem from "./AssessmentItem";

export default function AssessmentList() {
    return (
        <Flex flexWrap={"wrap"} gap={6}>
            <AssessmentItem />
            <AssessmentItem />
            <AssessmentItem />
            <AssessmentItem />
            <AssessmentItem />
            <AssessmentItem />
            <AssessmentItem />
        </Flex>
    );
}
