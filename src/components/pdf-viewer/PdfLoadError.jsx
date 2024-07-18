import {
    Box,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from "@chakra-ui/react";

export default function PdfLoadError() {
    return (
        <Box my={4} width="full">
            <Alert status="error" borderRadius="md" boxShadow="md" w="full">
                <AlertIcon />
                <Box>
                    <AlertTitle>Error Loading PDF</AlertTitle>
                    <AlertDescription>
                        The pdf has been removed or the assessment is no longer
                        available
                    </AlertDescription>
                </Box>
            </Alert>
        </Box>
    );
}
