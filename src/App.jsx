import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useUser from "./states/user";
import MainSpinner from "./components/MainSpinner";

// Pages
// TODO: use lazy loading
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import ViewAssessment from "./pages/ViewAssessment";
import EditAssessment from "./pages/EditAssessment";
import MyAssessments from "./pages/MyAssessments";
import StudentProfile from "./pages/StudentProfile";
import SubAssessmentsPage from "./pages/SubAssessmentsPage";
import MainLayout from "./layouts/MainLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
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
                path: "/edit/:id",
                element: <EditAssessment />,
            },
            {
                path: "/assessment/:id",
                element: <ViewAssessment />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/my-assessments/:type",
                element: <MyAssessments />,
                children: [
                    {
                        index: true,
                        element: <SubAssessmentsPage />,
                    },
                ],
            },
            {
                path: "/student-profile/:id",
                element: <StudentProfile />,
            },
        ],
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
