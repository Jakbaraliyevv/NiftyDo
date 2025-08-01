import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";

const root = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

export default root;
