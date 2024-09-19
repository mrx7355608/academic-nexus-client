import { Alert, AlertIcon } from "@chakra-ui/react";

export default function ErrorMessage({ err }) {
    return (
        <Alert status="error">
            <AlertIcon />
            {err}
        </Alert>
    );
}
