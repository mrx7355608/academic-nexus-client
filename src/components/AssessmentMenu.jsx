import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import useToastUtils from "../hooks/useToastUtils";
import { deleteAssessment } from "../services/assessment.services";
import useAssessments from "../states/assessments";

// eslint-disable-next-line
export default function AssessmentMenu({ id }) {
    const { showErrorToast, showSuccessToast } = useToastUtils();
    const { removeAssessment } = useAssessments();
    const [loading, setLoading] = useState(false);

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
                <MenuItem>Change password</MenuItem>
                <MenuItem textColor="red.400" onClick={del}>
                    {loading ? "Deleting..." : "Delete"}
                </MenuItem>
            </MenuList>
        </Menu>
    );

    async function del() {
        setLoading(true);
        const { error } = await deleteAssessment(id);
        if (error) {
            return showErrorToast(error);
        }

        removeAssessment(id);
        showSuccessToast("Assessment has been deleted");
        setLoading(false);
    }
}
