import { useEffect, useRef, useState } from "react";
import { Box, Flex, Button, Text, HStack, VStack } from "@chakra-ui/react";
import { pdfjs, Document, Page } from "react-pdf";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

export default function PdfViewer({ id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [scale, setScale] = useState(1.0);
    const viewRef = useRef(null);

    useEffect(() => {
        if (viewRef.current) {
            const pages = viewRef.current.querySelectorAll(".react-pdf__Page");
            const targetPage = pages[pageNumber - 1];
            if (targetPage) {
                targetPage.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [pageNumber]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        window.scrollTo(0, 0);
    };

    const toggleSidebar = () => setIsOpen(!isOpen);

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
                    <Button
                        size="sm"
                        variant="ghost"
                        py={5}
                        onClick={toggleSidebar}
                    >
                        <RxHamburgerMenu size={23} />
                    </Button>
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
                    {/* Pages sidebar */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: isOpen ? 0 : "-100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        style={{
                            position: "fixed",
                            left: 0,
                            top: "64px",
                            bottom: 0,
                            width: "20%",
                            backgroundColor: "#3b3b3b",
                            padding: "16px",
                            overflowY: "auto",
                            zIndex: 2,
                            height: "90vh",
                        }}
                    >
                        <VStack alignItems={"center"}>
                            {Array.from(new Array(numPages), (_el, index) => (
                                <Box
                                    key={`thumbnail-${index + 1}`}
                                    onClick={() => setPageNumber(index + 1)}
                                    cursor="pointer"
                                    p={1}
                                    border={
                                        pageNumber === index + 1
                                            ? "2px solid purple"
                                            : "1px solid gray"
                                    }
                                    my={5}
                                >
                                    <Page pageNumber={index + 1} width={150} />
                                </Box>
                            ))}
                        </VStack>
                    </motion.div>

                    {/* Main pdf view */}
                    <VStack ref={viewRef}>
                        {Array.from(new Array(numPages), (_el, index) => (
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
