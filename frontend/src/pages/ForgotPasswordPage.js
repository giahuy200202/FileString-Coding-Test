import ForgotPassword from "../components/Auth/ForgotPassword/forgotPassword";
import toast, { Toaster } from 'react-hot-toast';
import React from "react";

const ForgotPasswordPage = () => {
  return <React.Fragment>
    <ForgotPassword />
    <Toaster position="top-right" />
  </React.Fragment>;
};

export default ForgotPasswordPage;