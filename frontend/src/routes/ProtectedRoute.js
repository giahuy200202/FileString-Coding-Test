import React from 'react'
import { Navigate, useLocation } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../store/authContext";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children

};

export default ProtectedRoute;