import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home";
import { Register } from "../screens/Register";
import { Login } from "../screens/Login";
import { VerifyEmail } from "../screens/VerifyEmail";
import VerifyEmailToken from "../screens/VerifyEmailToken";
import ForgotPassword from "../screens/ForgotPassword";
import Navbar from "@/components/Navbar";
import Auth from "@/components/Auth";
import ResetPassword from "../screens/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Auth>
       <Navbar />
        <Home/>
     </Auth>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/verify-email-link",
    element: <VerifyEmailToken />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>
  }
]);

export default router;
