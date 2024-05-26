import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AuthContext from "../store/auth-context";
import LoginPage from "../pages/LoginPage";
import Register from "../components/Auth/Register/register";
import HomePage from "../pages/HomePage";
import ForgetPassword from "../components/Auth/ForgetPassword/forgetPassword";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>

      <Route path="/" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      } />

    </Routes>
  );
};

export default AppRoutes;
