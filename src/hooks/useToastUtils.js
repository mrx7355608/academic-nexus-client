import { useToast } from "@chakra-ui/react";

export default function useToastUtils() {
    const toast = useToast({
        isClosable: true,
        duration: 4000,
        variant: "subtle",
    });

    function showInfoToast(message) {
        toast({
            description: message,
            status: "info",
        });
    }

    function showWarningToast(message) {
        toast({
            description: message,
            status: "warning",
        });
    }

    function showSuccessToast(message) {
        toast({
            description: message,
            status: "success",
        });
    }

    function showErrorToast(message) {
        toast({
            description: message,
            status: "error",
        });
    }
    return {
        showInfoToast,
        showWarningToast,
        showSuccessToast,
        showErrorToast,
    };
}
