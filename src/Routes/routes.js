import { createBrowserRouter } from "react-router-dom";
import { Home, Details } from "../page";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/details/:id",
        element: <Details />
    }
]);

export default routes;