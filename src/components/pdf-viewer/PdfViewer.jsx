import { Box } from "@chakra-ui/react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function PdfViewer({ fileURL }) {
    return (
        <Box width={"100%"}>
            <iframe src={fileURL} frameBorder="0"></iframe>
        </Box>
    );
}
