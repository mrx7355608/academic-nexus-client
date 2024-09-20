import {
    Button,
    Box,
    Menu,
    FormLabel,
    MenuButton,
    MenuList,
    MenuItem,
    useColorMode,
} from "@chakra-ui/react";
import { useState } from "react";
import { memo } from "react";
import { IoMdEye } from "react-icons/io";

export default memo(function PublicPrivateMenu({ setAssessment, colorMode }) {
    const [isPublic, setIsPublic] = useState(true);

    return (
        <Box w="full">
            <FormLabel>Public or Private:</FormLabel>
            <Menu w="full">
                <MenuButton
                    as={Button}
                    leftIcon={<IoMdEye size={22} />}
                    w="full"
                    bg={colorMode === "light" ? "#d7d7d7" : "gray.700"}
                >
                    {isPublic ? "Public" : "Private"}
                </MenuButton>
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            setAssessment((prev) => ({
                                ...prev,
                                isPublic: true,
                            }));
                            setIsPublic(true);
                        }}
                    >
                        Public
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setAssessment((prev) => ({
                                ...prev,
                                isPublic: false,
                            }));
                            setIsPublic(false);
                        }}
                    >
                        Private
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
});
