import React from "react";
import { Box } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const FileViewer = React.memo(({ fileURL }) => {
    return (
        <Box height={"100vh"} my={5}>
            <DocViewer
                documents={[
                    {
                        uri: fileURL,
                    },
                ]}
                pluginRenderers={DocViewerRenderers}
            />
        </Box>
    );
});

FileViewer.displayName = "FileViewer";
export default FileViewer;
