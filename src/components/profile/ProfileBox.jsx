import { Divider, Box, Flex, Text, Heading } from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";

export default function ProfileBox({ user }) {
    return (
        <>
            <Flex alignItems={"center"}>
                <Box rounded="full" bg="purple.500" w="20px" h="20px"></Box>
                <Divider bg="purple.500" w="20px" h="5px" mr={3} />
                <Heading color="purple.500">{user.fullname}</Heading>
            </Flex>
            <Flex alignItems={"center"} gap={3} mt={5}>
                <FaEnvelope size={18} />
                <Text fontSize="lg">{user.email}</Text>
            </Flex>
            <Flex alignItems={"center"} gap={3} mt={5}>
                <PiCertificateFill size={24} />
                {user.degree ? (
                    <Text fontSize="lg">{user.degree}</Text>
                ) : (
                    <Text as="i" textColor={"gray.500"}>
                        No information provided
                    </Text>
                )}
            </Flex>
        </>
    );
}
