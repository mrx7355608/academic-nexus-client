import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";

import useUser from "./states/user";
import MainSpinner from "./components/MainSpinner";
import ViewAssessment from "./pages/ViewAssessment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/upload",
        element: <Upload />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/assessment/:id",
        element: <ViewAssessment />,
    },
]);

function App() {
    const [loading, setLoading] = useState(true);
    const setUser = useUser((state) => state.setUser);

    // Fetch logged in user data with useEffect
    useEffect(() => {
        async function getUser() {
            try {
                const serverURL = import.meta.env.VITE_SERVER_URL;
                const response = await fetch(`${serverURL}/api/students/me`, {
                    credentials: "include",
                });
                const result = await response.json();
                setUser(result.data);
            } catch (err) {
                // Do nothing (the user will be logged out)
                return null;
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, [setUser]);

    if (loading) {
        return <MainSpinner />;
    }

    return <RouterProvider router={router} />;
}

export default App;
