import { useEffect, useState } from "react";
import useUser from "../states/user";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
    Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import PublicPrivateMenu from "../components/upload-page/PublicPrivateMenu";
import SubjectMenu from "../components/upload-page/SubjectMenu";
import UploadType from "../components/upload-page/UploadType";

export default function EditAssessment() {
    const { colorMode } = useColorMode();
    const { id } = useParams();
    const user = useUser((state) => state.user);
    const navigate = useNavigate();
    const { showErrorToast, showSuccessToast } = useToastUtils();
    const [loading, setLoading] = useState(false);
    const [assessment, setAssessment] = useState({
        title: "",
        subject: "",
        isPublic: true,
        type: "quiz",
    });
    const [error, setError] = useState("");
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/");
            return showErrorToast("Please login to continue");
        }

        fetch(`${import.meta.env.VITE_SERVER_URL}/api/assessments/${id}`)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    resp.json().then((result) => setError(result.error));
                }
            })
            .then(({ data }) => {
                setAssessment({
                    title: data.title,
                    subject: data.subject,
                    isPublic: data.isPublic,
                    type: data.type,
                });
            })
            .catch(() => setError("An un-expected error occurred"))
            .finally(() => setFetching(false));
    }, [user]);

    return (
        <>
            {/* Heading */}
            <Flex alignItems="center" gap="5" mb={12}>
                <Heading fontWeight={700} fontSize={"4xl"}>
                    Edit
                </Heading>
                <Divider
                    w="full"
                    bg={colorMode === "light" ? "gray" : "gray.800"}
                    rounded="full"
                    h="2px"
                />
            </Flex>

            {fetching ? (
                <Flex alignItems={"center"} justifyContent="center" h={"200px"}>
                    <Spinner />
                </Flex>
            ) : error ? (
                <Text color="red.400">{error}</Text>
            ) : (
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
                            value={assessment.title}
                            onChange={(e) => {
                                setAssessment({
                                    ...assessment,
                                    title: e.target.value,
                                });
                            }}
                        />
                    </Box>

                    <SubjectMenu
                        setAssessment={setAssessment}
                        defaultSubject={assessment.subject}
                    />
                    <UploadType
                        setAssessment={setAssessment}
                        defaultType={assessment.type}
                    />
                    <PublicPrivateMenu
                        setAssessment={setAssessment}
                        defaultIsPublic={assessment.isPublic}
                    />

                    <Button
                        w="full"
                        colorScheme="purple"
                        onClick={editAssessment}
                    >
                        {loading ? <Spinner /> : "Save"}
                    </Button>
                </Flex>
            )}
        </>
    );

    async function editAssessment() {
        try {
            setLoading(true);

            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/assessments/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(assessment),
                credentials: "include",
            });
            const result = await response.json();

            if (response.ok) {
                showSuccessToast("Assessment has been updated");
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
