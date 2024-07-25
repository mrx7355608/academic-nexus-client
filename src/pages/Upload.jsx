import { useEffect, useState } from "react";
import useUser from "../states/user";
import { useNavigate } from "react-router-dom";
import useToastUtils from "../hooks/useToastUtils";
import {
    Button,
    Box,
    Heading,
    Flex,
    Divider,
    useColorMode,
    Input,
    FormLabel,
    Spinner,
} from "@chakra-ui/react";

// Components
import Navbar from "../components/Navbar";
import CloudinaryUploadWidget from "../components/upload-page/CloudinaryUploadWidget";
import PublicPrivateMenu from "../components/upload-page/PublicPrivateMenu";
import SubjectMenu from "../components/upload-page/SubjectMenu";
import UploadType from "../components/upload-page/UploadType";
import Footer from "../components/Footer";
import PageHeading from "../components/PageHeading";

export default function Upload() {
    const { colorMode } = useColorMode();
    const user = useUser((state) => state.user);
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

    useEffect(() => {
        if (!user) {
            navigate("/");
            return showErrorToast("Please login to continue");
        }
    }, [user]);

    return (
        <>
            {/* Upload Heading */}
            <Flex alignItems="center" gap="5" mb={12}>
                <PageHeading title={"Upload"} />
            </Flex>

            {/* Upload Form */}
            <Flex
                flexDirection="column"
                alignItems="start"
                justifyContent="center"
                gap={9}
                maxW="500px"
                mx="auto"
            >
                <Box w="full">
                    <FormLabel>Title:</FormLabel>
                    <Input
                        placeholder="Title"
                        bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                        onChange={(e) => {
                            setAssessment({
                                ...assessment,
                                title: e.target.value,
                            });
                        }}
                    />
                </Box>

                <SubjectMenu setAssessment={setAssessment} />
                <UploadType setAssessment={setAssessment} />
                <PublicPrivateMenu setAssessment={setAssessment} />

                <Box w="full">
                    <FormLabel>Password:</FormLabel>
                    <Input
                        placeholder="Password"
                        type="password"
                        bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                        onChange={(e) => {
                            setAssessment({
                                ...assessment,
                                password: e.target.value,
                            });
                        }}
                    />
                </Box>
                <CloudinaryUploadWidget setAssessment={setAssessment} />
                <Button
                    w="full"
                    colorScheme="purple"
                    onClick={uploadAssessment}
                >
                    {loading ? <Spinner /> : "Upload Assessment"}
                </Button>
            </Flex>
        </>
    );

    async function uploadAssessment() {
        try {
            setLoading(true);

            if (!assessment.subject) {
                return showErrorToast("Assessment must have a subject");
            } else if (!assessment.fileURL) {
                return showErrorToast(
                    "You must add a file in order to upload assessment",
                );
            } else if (!assessment.title) {
                return showErrorToast("Assessment must have a title");
            }

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/assessments/`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(assessment),
                credentials: "include",
            });
            const result = await response.json();

            if (response.ok) {
                showSuccessToast("Assessment uploaded successfully");
                navigate("/");
            } else {
                showErrorToast(result.error);
            }
        } catch (err) {
            showErrorToast("An error occurred");
        } finally {
            setLoading(false);
        }
    }
}
