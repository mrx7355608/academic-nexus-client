import { Box } from "@chakra-ui/react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

export default function DocxViewer({ id }) {
    return (
        <Box height={"100vh"} my={5}>
            <DocViewer
                documents={[
                    {
                        uri: `${import.meta.env.VITE_SERVER_URL}/api/assessments/view-assessment-file/${id}`,
                    },
                ]}
                pluginRenderers={DocViewerRenderers}
            />
        </Box>
    );
}
