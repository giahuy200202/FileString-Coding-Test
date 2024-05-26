
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";


const HomePageContent = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={logoutHandler}>logout</button>

    </div>
  );
};
export default HomePageContent;
