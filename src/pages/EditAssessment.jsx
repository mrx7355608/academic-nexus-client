import { useEffect, useState } from "react";
import useUser from "../states/user";
import { useNavigate, useParams } from "react-router-dom";
import useToastUtils from "../hooks/useToastUtils";
import {
    Button,
    Box,
    Flex,
    useColorMode,
    Input,
    FormLabel,
    Spinner,
    Text,
} from "@chakra-ui/react";
import PublicPrivateMenu from "../components/upload-page/PublicPrivateMenu";
import SubjectMenu from "../components/upload-page/SubjectMenu";
import UploadType from "../components/upload-page/UploadType";
import PageHeading from "../components/PageHeading";
import { editAssessment, getAssessment } from "../services/assessment.services";

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
    const [err, setError] = useState("");
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/");
            return showErrorToast("Please login to continue");
        }

        getAssessment(id).then(({ data, error }) => {
            if (error) {
                setError(error);
            } else {
                setAssessment({
                    title: data.title,
                    subject: data.subject,
                    isPublic: data.isPublic,
                    type: data.type,
                });
            }
            setFetching(false);
        });
    }, [user]);

    return (
        <>
            {/* Heading */}
            <Flex alignItems="center" gap="5" mb={12}>
                <PageHeading title={"Edit Assessment"} />
            </Flex>

            {fetching ? (
                <Flex alignItems={"center"} justifyContent="center" h={"200px"}>
                    <Spinner />
                </Flex>
            ) : err ? (
                <Text color="red.400">{err}</Text>
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

                    <Button w="full" colorScheme="purple" onClick={edit}>
                        {loading ? <Spinner /> : "Save"}
                    </Button>
                </Flex>
            )}
        </>
    );

    async function edit() {
        setLoading(true);
        const { data, error } = await editAssessment(id, assessment);
        if (data) {
            showSuccessToast("Assessment has been updated");
            navigate("/");
        } else {
            showErrorToast(error);
        }
        setLoading(false);
    }
}
