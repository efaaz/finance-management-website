import App from "@/App";
import SpendingTable from "@/components/SpendingTable/SpendingTable";
import LandingPage from "@/Layouts/LandingPage";
import Error from "@/Pages/ErrorPage/Error";
import Home from "@/Pages/Home/Home";
import SignIn from "@/Pages/SignIn/SignIn";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <LandingPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/SpendingTable",
        element: <SpendingTable />,
      },
    ],
  },
]);
