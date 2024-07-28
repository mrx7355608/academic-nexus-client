import { lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useUser from "./states/user";
import MainSpinner from "./components/MainSpinner";

// Pages
// TODO: use lazy loading
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Search = lazy(() => import("./pages/Search"));
const Upload = lazy(() => import("./pages/Upload"));
const Profile = lazy(() => import("./pages/Profile"));
const ViewAssessment = lazy(() => import("./pages/ViewAssessment"));
const EditAssessment = lazy(() => import("./pages/EditAssessment"));
const MyAssessments = lazy(() => import("./pages/MyAssessments"));
const StudentProfile = lazy(() => import("./pages/StudentProfile"));
const SubAssessmentsPage = lazy(() => import("./pages/SubAssessmentsPage"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const GuestRoute = lazy(() => import("./components/GuestRoute"));
const NotFound = lazy(() => import("./pages/NotFound"));
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/upload",
                element: (
                    <ProtectedRoute>
                        <Upload />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/login",
                element: (
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/edit/:id",
                element: (
                    <ProtectedRoute>
                        <EditAssessment />
                    </ProtectedRoute>
                ),
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
                element: (
                    <ProtectedRoute>
                        <MyAssessments />
                    </ProtectedRoute>
                ),
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
            {
                path: "*",
                element: <NotFound />,
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
                const response = await fetch("/api/students/me", {
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
