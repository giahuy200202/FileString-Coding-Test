
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import RingLoader from "react-spinners/RingLoader";

const HomepageComponent = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    navigate("/login");
  };
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <h1 className="text-5xl mb-40">Homepage</h1>

      <RingLoader
        color="#1d4ed8"
        size={400}
        speedMultiplier={0.5}
      />

      <button
        className="bg-blue text-white py-2 px-4 h-12 rounded-lg w-28 mt-40 flex items-center justify-center"
        onClick={logoutHandler}
      >
        Logout
      </button>

    </div>
  );
};
export default HomepageComponent;
