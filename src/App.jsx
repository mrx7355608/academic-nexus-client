import { lazy, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useUser from "./states/user";
import MainSpinner from "./components/main/MainSpinner";

// Pages
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
const ProtectedRoute = lazy(
    () => import("./components/route-protection/ProtectedRoute"),
);
const GuestRoute = lazy(
    () => import("./components/route-protection/GuestRoute"),
);
const NotFound = lazy(() => import("./pages/NotFound"));
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import useFetch from "./hooks/useFetch";

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
    const setUser = useUser((state) => state.setUser);
    const { loading, data } = useFetch("/api/students/me", true);

    if (data) {
        setUser(data);
    }

    if (loading) {
        return <MainSpinner />;
    }

    return <RouterProvider router={router} />;
}

export default App;
