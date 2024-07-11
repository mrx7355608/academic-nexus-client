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
    // TODO: Fetch logged in user data with useEffect

    return <RouterProvider router={router} />;
}

export default App;
