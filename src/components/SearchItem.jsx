import { IoMdEye } from "react-icons/io";
import { Flex, Text, Image, Box, Button, useColorMode } from "@chakra-ui/react";

export default function SearchItem({ student }) {
    const { colorMode } = useColorMode();
    return (
        <Box w="full">
            <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={3}>
                    <Image
                        src={student.profilePicture}
                        w={"70px"}
                        h={"70px"}
                        rounded="full"
                        objectFit={"cover"}
                    />
                    <Box>
                        <Text fontSize="lg" fontWeight={600}>
                            {student.fullname}
                        </Text>
                        <Text
                            size="sm"
                            textColor={
                                colorMode === "dark" ? "gray.500" : "#838383"
                            }
                        >
                            {student.degree || "No degree provided"}
                        </Text>
                    </Box>
                </Flex>
                <Button leftIcon={<IoMdEye size={22} />} colorScheme="purple">
                    View profile
                </Button>
            </Flex>
        </Box>
    );
}
