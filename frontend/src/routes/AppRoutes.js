import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AuthContext from "../store/auth-context";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>

      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgotPasswordPage />} />
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
