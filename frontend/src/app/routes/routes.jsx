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
import VerifyOtp from "../screens/VerifyOtp";
import AuthSuccess from "../screens/AuthSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <>
       <Navbar />
        <Home/>
     </>
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
    path: "/auth-success",
    element: <AuthSuccess />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
      path: "/verify-otp",
      element: <VerifyOtp/>
  },
  {
    path: "/reset-password",
    element: <ResetPassword/>
  }
]);

export default router;
