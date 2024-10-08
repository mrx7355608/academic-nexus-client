import { memo, useEffect, useRef, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { IoCameraSharp } from "react-icons/io5";
import useToastUtils from "../../../hooks/useToastUtils";

export default memo(function CloudinaryUploadWidget({
    setAssessment,
    colorMode,
}) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [isUploaded, setIsUploaded] = useState(false);
    const { showInfoToast, showSuccessToast } = useToastUtils();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: import.meta.env.VITE_CLOUD_NAME,
                uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
                maxFileSize: 2097152,
                accept: "application/pdf, image/jpeg, image/png, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/jpg",
                multiple: false,
                maxFiles: 1,
            },
            function (_error, result) {
                if (result.event === "success") {
                    showSuccessToast("File uploaded successfully");
                    setIsUploaded(true);

                    const fileParts = result.info.path.split(".");
                    const fileFormat =
                        result.info.format || fileParts[fileParts.length - 1];

                    setAssessment((prev) => ({
                        ...prev,
                        fileURL: result.info.secure_url,
                        fileExtension: fileFormat,
                        publicId: result.info.public_id,
                    }));
                }
            },
        );
    }, []);

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            w="full"
            minH={"200px"}
            bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
            rounded="lg"
            _hover={{
                bg: colorMode === "light" ? "gray.300" : "gray.600",
                cursor: "pointer",
            }}
            onClick={() => {
                if (isUploaded) {
                    showInfoToast("You have already uploaded a file");
                } else {
                    widgetRef.current.open();
                }
            }}
        >
            <Button
                variant={"ghost"}
                _hover={{
                    bg: "transparent",
                }}
                size="lg"
                leftIcon={<IoCameraSharp size={26} />}
            >
                {isUploaded ? "File uploaded" : "Upload File"}
            </Button>
        </Flex>
    );
});
