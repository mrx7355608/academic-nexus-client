import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";

// eslint-disable-next-line
export default function AssessmentMenu({ id }) {
    return (
        <Menu>
            <MenuButton
                as={Button}
                size="sm"
                variant="ghost"
                rounded="full"
                px={1}
                pl={2}
            >
                <HiDotsVertical size={17} />
            </MenuButton>
            <MenuList>
                <Link to={`/edit/${id}`}>
                    <MenuItem>Edit</MenuItem>
                </Link>
                <MenuItem>Make private</MenuItem>
                <MenuItem>Change password</MenuItem>
                <MenuItem textColor="red.400">Delete</MenuItem>
            </MenuList>
        </Menu>
    );
}
