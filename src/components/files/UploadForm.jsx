import { Flex, useColorMode } from "@chakra-ui/react";
import SubjectMenu from "../ui/form/SubjectMenu";
import PublicPrivateMenu from "../ui/form/PublicPrivateMenu";
import CloudinaryUploadWidget from "../ui/form/CloudinaryUploadWidget";
import FileTitleInput from "../ui/form/FileTitleInput";

export default function UploadForm({ setAssessment }) {
    const { colorMode } = useColorMode();

    return (
        <Flex
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            gap={9}
            maxW="500px"
            mx="auto"
        >
            <FileTitleInput
                setAssessment={setAssessment}
                colorMode={colorMode}
            />
            <SubjectMenu setAssessment={setAssessment} colorMode={colorMode} />
            <PublicPrivateMenu
                setAssessment={setAssessment}
                colorMode={colorMode}
            />
            <CloudinaryUploadWidget
                setAssessment={setAssessment}
                colorMode={colorMode}
            />
        </Flex>
    );
}
