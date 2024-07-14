import { Box } from "@chakra-ui/react";

export default function PdfViewer({ pdfUrl }) {
    return (
        <Box w="full" height="700px">
            <iframe src={pdfUrl} width={"100%"} height={"100%"} />
        </Box>
    );
}
