import { Box, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

export default function PagesSidebar({ id }) {
    const [isOpen, setIsOpen] = useState(false);
    const [numPages, setNumPages] = useState();
    // eslint-disable-next-line
    const [pageNumber, _setNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // const handlePageClick = (pageNumber) => {
    //     setPageNumber(pageNumber);
    // };

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <Button size="sm" variant="ghost" py={5} onClick={toggleSidebar}>
                <RxHamburgerMenu size={23} />
            </Button>

            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? 0 : "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                style={{
                    position: "absolute",
                    left: 0,
                    top: "64px",
                    bottom: 0,
                    width: "20%",
                    backgroundColor: "#3b3b3b",
                    padding: "16px",
                    overflowY: "auto",
                    zIndex: 4,
                    height: "100%",
                    minHeight: "100vh",
                }}
            >
                <VStack
                    alignItems={"center"}
                    display={isOpen ? "flex" : "none"}
                >
                    {/* <Document */}
                    {/*     file={`${import.meta.env.VITE_SERVER_URL}/api/assessments/view-assessment-file/${id}`} */}
                    {/*     onLoadSuccess={onDocumentLoadSuccess} */}
                    {/* > */}
                    {/*     {Array.from(new Array(numPages), (el, index) => ( */}
                    {/*         <Box */}
                    {/*             key={`thumbnail-${index + 1}`} */}
                    {/*             onClick={() => handlePageClick(index + 1)} */}
                    {/*             cursor="pointer" */}
                    {/*             p={1} */}
                    {/*             border={ */}
                    {/*                 pageNumber === index + 1 */}
                    {/*                     ? "2px solid purple" */}
                    {/*                     : "1px solid gray" */}
                    {/*             } */}
                    {/*             my={5} */}
                    {/*         > */}
                    {/*             <Page pageNumber={index + 1} width={150} /> */}
                    {/*         </Box> */}
                    {/*     ))} */}
                    {/* </Document> */}
                </VStack>
            </motion.div>
        </>
    );
}
