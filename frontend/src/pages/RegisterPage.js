import Register from "../components/Auth/Register/register";
import toast, { Toaster } from 'react-hot-toast';
import React from "react";

const RegisterPage = () => {
  return <React.Fragment>
    <Register />
    <Toaster position="top-right" />
  </React.Fragment>;
};

export default RegisterPage;