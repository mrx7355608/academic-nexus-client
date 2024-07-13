import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

function App() {
    // const { setUser } = useUser();

    // Fetch logged in user data with useEffect
    // useEffect(() => {
    //     async function getUser() {
    //         const serverURL = import.meta.env.VITE_SERVER_URL;
    //         const response = await fetch(`${serverURL}/api/students/me`, {
    //             credentials: "include",
    //         });
    //         const result = response.json();
    //         setUser(result.data);
    //     }
    //
    //     getUser();
    // }, [setUser]);

    return <RouterProvider router={router} />;
}

export default App;
