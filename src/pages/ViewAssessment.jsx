import { useParams } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import PageHeading from "../components/PageHeading";
import ErrorBoundary from "../components/main/ErrorBoundary";
import FileUI from "../components/files/FileUI";
import ErrorMessage from "../components/ui/ErrorMessage";
import useFetch from "../hooks/useFetch";

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
