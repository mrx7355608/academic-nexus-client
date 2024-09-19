import React, { useEffect, useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import ErrorMessage from "../ui/ErrorMessage";

const FileViewer = React.memo(({ fileURL }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(fileURL)
            .then((resp) => {
                if (!resp.ok) {
                    setError("Unable to load file");
                }
            })
            .catch(() => setError("Unable to load file"))
            .finally(setLoading(false));
    }, [fileURL]);

    return (
        <Box height={"100vh"} my={5}>
            {loading && <Spinner />}
            {error && <ErrorMessage err={error} />}
            {!error && !loading ? (
                <DocViewer
                    documents={[
                        {
                            uri: fileURL,
                        },
                    ]}
                    pluginRenderers={DocViewerRenderers}
                />
            ) : null}
        </Box>
    );
});

FileViewer.displayName = "FileViewer";
export default FileViewer;
