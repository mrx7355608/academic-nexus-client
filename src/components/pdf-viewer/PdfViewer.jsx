import { useEffect, useRef, useState } from "react";
import { Box, Flex, Spinner, useColorMode, VStack } from "@chakra-ui/react";
import { pdfjs, Document, Page } from "react-pdf";
import { motion } from "framer-motion";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Toolbar from "./Toolbar";
import PdfLoadError from "./PdfLoadError";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

export default function PdfViewer({ id }) {
    const { colorMode } = useColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [scale, setScale] = useState(1.0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [bgColor, setBgColor] = useState("gray.200");
    const viewRef = useRef(null);

    useEffect(() => {
        if (viewRef.current) {
            const pages = viewRef.current.querySelectorAll(".react-pdf__Page");
            const targetPage = pages[pageNumber - 1];
            if (targetPage) {
                targetPage.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [pageNumber, colorMode]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const toggleSidebar = () => setIsOpen(!isOpen);

    function onLoadError() {
        setBgColor(colorMode === "light" ? "gray.200" : "gray.800");
    }

    return (
        <Box
            width={"100%"}
            pos={isFullscreen ? "absolute" : "relative"}
            top={0}
            left={0}
            mb={12}
            bg={bgColor}
            overflowX="hidden"
            overflowY={"auto"}
            pt={0}
            height={"100vh"}
        >
            <Toolbar
                pageNumber={pageNumber}
                numPages={numPages}
                toggleSidebar={toggleSidebar}
                setScale={setScale}
                isFullscreen={isFullscreen}
                setIsFullscreen={setIsFullscreen}
            />
            <Flex w="max-content" mx="auto" pos={"relative"}>
                <Document
                    file={`${import.meta.env.VITE_SERVER_URL}/api/assessments/view-assessment-file/${id}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<Spinner mt={12} />}
                    onLoadError={onLoadError}
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
                            padding: "16px",
                            overflowY: "auto",
                            zIndex: 2,
                            height: "90vh",
                            backgroundColor:
                                colorMode === "light"
                                    ? "rgb(209,209,209)"
                                    : "gray.400",
                        }}
                        id="sidebar-pages"
                    >
                        <VStack alignItems={"center"} w="full">
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
