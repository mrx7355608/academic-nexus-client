import { Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <>
            <Heading fontSize={"3xl"}>Something went wrong!</Heading>
            <Text mt={5}>
                <Link to="/">Go back to home</Link>
            </Text>
        </>
    );
}
