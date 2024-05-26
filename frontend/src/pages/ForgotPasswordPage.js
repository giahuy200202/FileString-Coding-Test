import ForgotPasswordStep1 from "../components/auth/forgotPassword/forgotPasswordStep1";
import ForgotPasswordStep2 from "../components/auth/forgotPassword/forgotPasswordStep2";
import ForgotPasswordStep3 from "../components/auth/forgotPassword/forgotPasswordStep3";
import { Toaster } from 'react-hot-toast';
import React from "react";
import AuthContext from '../store/authContext';
import { useContext } from 'react';

const ForgotPasswordPage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster position="top-right" />
      {authCtx.forgotPasswordStep === 1 && <ForgotPasswordStep1 />}
      {authCtx.forgotPasswordStep === 2 && <ForgotPasswordStep2 />}
      {authCtx.forgotPasswordStep === 3 && <ForgotPasswordStep3 />}
    </div>);
};

export default ForgotPasswordPage;