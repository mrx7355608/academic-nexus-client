import {
    Box,
    Flex,
    Input,
    Button,
    Text,
    useColorMode,
    Spinner,
    Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import useUser from "../states/user";
import { TbLogout } from "react-icons/tb";
import { useState } from "react";
import useToastUtils from "../hooks/useToastUtils";

export default function Navbar() {
    const [loading, setLoading] = useState(false);
    const { colorMode } = useColorMode();
    const user = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);
    const { showSuccessToast, showErrorToast } = useToastUtils();

    return (
        <Box bg="transparent" px={10} py={6}>
            <Flex alignItems="center" gap={9}>
                <Box minW="max-content">
                    <Text fontSize="xl" fontWeight={"black"} display={"inline"}>
                        academic{" "}
                    </Text>
                    <Text
                        fontSize="xl"
                        fontWeight={"black"}
                        textColor={
                            colorMode === "light" ? "purple.700" : "purple.500"
                        }
                        display={"inline"}
                    >
                        nexus.
                    </Text>
                </Box>
                <Input
                    placeholder="Search students"
                    bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                    rounded="md"
                    w={"full"}
                    fontSize="sm"
                />
                <Flex
                    alignItems={"center"}
                    gap={9}
                    fontWeight={"600"}
                    fontSize={"sm"}
                >
                    <Link to="/">Home</Link>
                    <Link to="/upload">Upload</Link>
                    <Link to="/library">Library</Link>
                    <Link to="/profile">
                        <Image
                            src={user.profilePicture}
                            objectFit="cover"
                            rounded="full"
                        />
                    </Link>
                    {user ? (
                        <Button
                            size={"sm"}
                            rounded="8px"
                            border="2px solid"
                            borderColor={
                                colorMode === "light" ? "gray.700" : "gray.300"
                            }
                            bg="transparent"
                            p={4}
                            px={7}
                            onClick={logout}
                        >
                            {loading ? <Spinner size="sm" /> : "Logout"}
                        </Button>
                    ) : (
                        <Link to="/login">
                            <Button
                                size={"sm"}
                                rounded="8px"
                                border="2px solid"
                                borderColor={
                                    colorMode === "light"
                                        ? "gray.700"
                                        : "gray.300"
                                }
                                bg="transparent"
                                px={5}
                                py={4}
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                    <DarkModeToggle />
                </Flex>
            </Flex>
        </Box>
    );

    async function logout() {
        try {
            setLoading(true);
            const serverURL = import.meta.env.VITE_SERVER_URL;
            const response = await fetch(`${serverURL}/api/auth/logout`, {
                method: "post",
                credentials: "include",
            });
            const result = await response.json();

            if (response.ok) {
                showSuccessToast("Logged out successfully");
                setUser(null);
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
