// import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
// import AuthContext from "../store/authContext";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import HomePage from "../pages/homepage";
import ForgotPasswordPage from "../pages/forgotPasswordPage";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
  // const authCtx = useContext(AuthContext);

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
