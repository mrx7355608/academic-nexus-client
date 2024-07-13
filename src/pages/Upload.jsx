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
} from "@chakra-ui/react";

// Components
import Navbar from "../components/Navbar";
import CloudinaryUploadWidget from "../components/upload-page/CloudinaryUploadWidget";
import PublicPrivateMenu from "../components/upload-page/PublicPrivateMenu";
import SubjectMenu from "../components/upload-page/SubjectMenu";
import UploadType from "../components/upload-page/UploadType";

export default function Upload() {
    const { colorMode } = useColorMode();
    const user = useUser((state) => state.user);
    const navigate = useNavigate();
    const { showErrorToast } = useToastUtils();
    const [assessment, setAssessment] = useState({
        title: "",
        fileURL: "",
        selectedSubject: "",
        isPublic: true,
        type: "quiz",
    });

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/");
    //         return showErrorToast("Please login to continue");
    //     }
    // }, [navigate, showErrorToast, user]);

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="80vw" mx={"auto"}>
                {/* Upload Heading */}
                <Flex alignItems="center" gap="5" mb={12}>
                    <Heading fontWeight={700} fontSize={"4xl"}>
                        Upload
                    </Heading>
                    <Divider
                        w="full"
                        bg={colorMode === "light" ? "gray" : "gray.800"}
                        rounded="full"
                        h="2px"
                    />
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
                    <CloudinaryUploadWidget setAssessment={setAssessment} />
                    <Button
                        w="full"
                        colorScheme="purple"
                        onClick={() => console.log(assessment)}
                    >
                        Upload Assessment
                    </Button>
                </Flex>
            </Box>
        </>
    );
}
