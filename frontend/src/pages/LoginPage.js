import Login from "../components/Auth/Login/login";
import toast, { Toaster } from 'react-hot-toast';
import React from "react";

const LoginPage = () => {
  return <React.Fragment>
    <Login />
    <Toaster position="top-right" />
  </React.Fragment>;
};

export default LoginPage;