import { useEffect } from "react";
import useUser from "../states/user";
import { useNavigate } from "react-router-dom";
import useToastUtils from "../hooks/useToastUtils";

export default function Upload() {
    const user = useUser((state) => state.user);
    const navigate = useNavigate();
    const { showErrorToast } = useToastUtils();

    useEffect(() => {
        if (!user) {
            console.log("running");
            navigate("/");
            return showErrorToast("Please login to continue");
        }
    }, [navigate, showErrorToast, user]);

    return <div>Upload</div>;
}
