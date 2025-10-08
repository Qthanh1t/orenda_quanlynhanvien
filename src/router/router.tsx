import {createBrowserRouter} from "react-router-dom";
import OrdLayout from "../layout/OrdLayout.tsx";
import Home from "../page/Home.tsx";
import App from "../App.tsx";
import UpdateEmployee from "../page/UpdateEmployee.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <OrdLayout/>,
        children: [
            {
                path: "/",
                element: <Home/>,
                index: true
            },
            {
                path: "/employees/",
                element: <App/>
            },
            {
                path: "/updateEmployee/:id",
                element: <UpdateEmployee/>
            }
        ]
    }
])