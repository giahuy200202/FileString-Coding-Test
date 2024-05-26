import Login from "../components/auth/login/login";
import { Toaster } from 'react-hot-toast';
import React from "react";

const LoginPage = () => {
  return <React.Fragment>
    <Login />
    <Toaster position="top-right" />
  </React.Fragment>;
};

export default LoginPage;