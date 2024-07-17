import { Box, Flex, Button, Text, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "react-pdf/dist/Page/TextLayer.css";
import PagesSidebar from "./PagesSidebar";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

export default function PdfViewer({ id }) {
    const [numPages, setNumPages] = useState();
    const [pageNumber, _setPageNumber] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [scale, setScale] = useState(1.0);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        window.scrollTo(0, 0);
    };

    return (
        <Box
            width={isFullscreen ? "100%" : "70vw"}
            pos={isFullscreen ? "absolute" : "relative"}
            top={0}
            left={0}
            mb={12}
            bg={"white"}
            overflowX="hidden"
            pt={isFullscreen ? 20 : 0}
        >
            <HStack
                justifyContent="space-between"
                bg={"#262626"}
                p={3}
                position={isFullscreen ? "fixed" : "relative"}
                top={0}
                zIndex={4}
                w="full"
            >
                <HStack>
                    <PagesSidebar id={id} />
                    <Button onClick={toggleFullscreen}>
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </Button>
                </HStack>
                <Text>
                    Page {pageNumber} of {numPages}
                </Text>
                <HStack>
                    <Button onClick={() => setScale(scale + 0.1)}>
                        Zoom In
                    </Button>
                    <Button onClick={() => setScale(scale - 0.1)}>
                        Zoom Out
                    </Button>
                </HStack>
            </HStack>
            <Flex w="max-content" mx="auto">
                <Document
                    file={`${import.meta.env.VITE_SERVER_URL}/api/assessments/view-assessment-file/${id}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <VStack>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Box
                                key={index}
                                my={4}
                                boxShadow="0 0 15px gray"
                                rounded="lg"
                                overflow="hidden"
                            >
                                <Page pageNumber={index + 1} scale={scale} />
                            </Box>
                        ))}
                    </VStack>
                </Document>
            </Flex>
        </Box>
    );
}
