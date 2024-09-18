import { Navigate } from "react-router-dom";
import useUser from "../../states/user";

export default function ProtectedRoute({ children }) {
    const user = useUser((state) => state.user);

    return user ? children : <Navigate to={"/"} />;
}
