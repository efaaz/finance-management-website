import App from "@/App";
import LandingPage from "@/Layouts/LandingPage";
import Error from "@/Pages/ErrorPage/Error";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error />,
      element: <LandingPage />,
      children: [

      ]
    },
  ]);