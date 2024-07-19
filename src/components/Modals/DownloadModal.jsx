import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    ModalBody,
    Spinner,
    HStack,
    Alert,
    AlertIcon,
    AlertDescription,
    Input,
    Box,
    Text,
    useColorMode,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";

export default function DownloadModal({ id, fileName }) {
    const { colorMode } = useColorMode();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [downloading, setDownloading] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <>
            <Button
                type="button"
                px={2}
                size={"sm"}
                variant="ghost"
                textDecor={"underline"}
                color={colorMode === "light" ? "gray.700" : "gray.300"}
                leftIcon={
                    <HiOutlineDownload
                        size={20}
                        style={{ marginRight: "-4px" }}
                    />
                }
                _hover={{
                    textColor: "purple.400",
                }}
                onClick={onOpen}
            >
                Download
            </Button>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                size={"lg"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Download file</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} onSubmit={(e) => e.preventDefault()}>
                        <Box mb={4} mt={3} width="full">
                            <Alert
                                status="info"
                                borderRadius="md"
                                boxShadow="md"
                                w="full"
                            >
                                <AlertIcon />
                                <Box>
                                    <AlertDescription>
                                        You only have 3 attempts, after that you
                                        will have to wait for some time to be
                                        able to try again
                                    </AlertDescription>
                                </Box>
                            </Alert>
                        </Box>
                        <Input
                            type="password"
                            autocomplete="new-password"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={error ? true : false}
                        />
                        <Text size="xs" color="red.400" mt={1}>
                            {error}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <HStack>
                            <Button
                                onClick={() => downloadFile(id, fileName)}
                                colorScheme="purple"
                            >
                                {downloading ? (
                                    <>
                                        <Spinner size="xs" />
                                        <Text size="sm" ml={2}>
                                            Downloading
                                        </Text>
                                    </>
                                ) : (
                                    "Download"
                                )}
                            </Button>
                            <Button onClick={onClose}>Close</Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );

    function downloadFile(id, fileName) {
        setDownloading(true);

        const url = `${import.meta.env.VITE_SERVER_URL}/api/assessments/download-file/${id}`;
        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        })
            .then(async (response) => {
                if (response.ok) {
                    return response.blob();
                }

                const result = await response.json();
                throw new Error(result.error);
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement("a");
                link.href = url;
                link.download = fileName;

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
                onClose();
                setError("");
            })
            .catch((err) => setError(err.message))
            .finally(() => setDownloading(false));
    }
}
