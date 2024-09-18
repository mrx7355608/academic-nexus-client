import { Box } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

export default function FileViewer({ fileURL }) {
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
}
