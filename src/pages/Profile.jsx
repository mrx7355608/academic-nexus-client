import Navbar from "../components/Navbar";
import {
    Box,
    Flex,
    Heading,
    Text,
    Divider,
    useColorMode,
} from "@chakra-ui/react";
import useUser from "../states/user";
import {
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";
import { PiCertificateFill } from "react-icons/pi";

export default function Profile() {
    const { colorMode } = useColorMode();
    const user = useUser((state) => state.user);

    return (
        <>
            <Navbar />
            <Box p={4} mt={8} maxW="80vw" mx={"auto"}>
                <Flex alignItems="center" gap="5" mb={12}>
                    <Heading fontWeight={700} fontSize={"4xl"}>
                        Profile
                    </Heading>
                    <Divider
                        w="full"
                        bg={colorMode === "light" ? "gray" : "gray.800"}
                        rounded="full"
                        h="2px"
                    />
                </Flex>

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
                {/* Social links icons */}
                <Flex mt={10} gap={4} alignItems="center">
                    <FaFacebook size={20} />
                    <FaInstagram size={20} />
                    <FaTwitter size={20} />
                    <FaLinkedinIn size={20} />
                </Flex>
            </Box>
        </>
    );
}
