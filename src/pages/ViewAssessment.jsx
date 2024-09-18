import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Heading, Flex, useColorMode, Spinner, Text } from "@chakra-ui/react";
import PageHeading from "../components/PageHeading";
import ErrorBoundary from "../components/ErrorBoundary";
import FileUI from "../components/FileUI";
import ErrorMessage from "../components/ui/ErrorMessage";

export default function ViewAssessment() {
    const { id } = useParams();
    const { loading, data, error } = useFetch(`/api/files/${id}`);

    return (
        <>
            <PageHeading title={"View Assessment"} />
            {loading && <Spinner />}
            {error && <ErrorMessage err={error} />}
            {data && (
                <ErrorBoundary
                    fallback={<ErrorMessage err={"Something went wrong!"} />}
                >
                    <FileUI data={data} />
                </ErrorBoundary>
            )}
        </>
    );
}
