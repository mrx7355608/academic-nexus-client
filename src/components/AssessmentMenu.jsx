import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Link } from "react-router-dom";
import useToastUtils from "../hooks/useToastUtils";
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
                <MenuItem textColor="red.400" onClick={deleteAssessment}>
                    {loading ? "Deleting..." : "Delete"}
                </MenuItem>
            </MenuList>
        </Menu>
    );

    async function deleteAssessment() {
        try {
            setLoading(true);
            const options = {
                method: "delete",
                credentials: "include",
            };
            const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/assessments/${id}`,
                options,
            );
            if (!response.ok) {
                const result = await response.json();
                return showErrorToast(result.error);
            }

            removeAssessment(id);
            showSuccessToast("Assessment has been deleted");
        } catch (err) {
            showErrorToast("An un-expected error occurred");
        } finally {
            setLoading(false);
        }
    }
}
