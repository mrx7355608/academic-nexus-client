import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useToastUtils from "../hooks/useToastUtils";
import { Button, useColorMode } from "@chakra-ui/react";

// Components
import CloudinaryUploadWidget from "../components/upload-page/CloudinaryUploadWidget";
import PageHeading from "../components/PageHeading";
import { createAssessment } from "../services/assessment.services";
import UploadForm from "../components/files/UploadForm";

export default function Upload() {
    const navigate = useNavigate();
    const { showErrorToast, showSuccessToast } = useToastUtils();
    const [loading, setLoading] = useState(false);
    const [assessment, setAssessment] = useState({
        title: "",
        fileURL: "",
        subject: "",
        publicId: "",
        isPublic: true,
        type: "quiz",
        fileExtension: "",
        password: "",
    });

    const memoizedSetAssessment = useCallback((newVal) => {
        setAssessment(newVal);
    }, []);

    return (
        <>
            <PageHeading title={"Upload"} />
            <UploadForm setAssessment={memoizedSetAssessment} />
            <Button
                w="full"
                colorScheme="purple"
                onClick={uploadAssessment}
                isLoading={loading}
                isDisabled={loading}
            >
                Upload Assessment
            </Button>
        </>
    );

    function validateFile() {
        if (!assessment.subject) {
            return "Assessment must have a subject";
        } else if (!assessment.fileURL) {
            return "You must add a file in order to upload assessment";
        } else if (!assessment.title) {
            return "Assessment must have a title";
        }
    }

    async function uploadAssessment() {
        // Validate the data
        const errorMessage = validateFile();
        if (errorMessage) return showErrorToast(errorMessage);

        setLoading(true);

        // Make an api call to create an assessment
        const { error: apiError } = await createAssessment(assessment);
        if (apiError) {
            showErrorToast(apiError);
        } else {
            showSuccessToast("Assessment uploaded successfully");
            navigate("/");
        }
        setLoading(false);
    }
}
