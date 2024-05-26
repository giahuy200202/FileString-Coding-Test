import RegisterStep1 from "../components/auth/register/registerStep1";
import RegisterStep2 from "../components/auth/register/registerStep2";
import { Toaster } from 'react-hot-toast';
import React from "react";
import AuthContext from '../store/authContext';
import { useContext } from 'react';

const RegisterPage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster position="top-right" />
      {authCtx.registerStep === 1 && <RegisterStep1 />}
      {authCtx.registerStep === 2 && <RegisterStep2 />}
    </div>);
};

export default RegisterPage;