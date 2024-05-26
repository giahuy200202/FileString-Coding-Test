import { useState, useRef, useContext, useEffect, Suspense } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { useLocation } from "react-router-dom";

import { ReactComponent as GoogleIcon } from '../../../assets/svg/login/google.svg';
import { ReactComponent as HideIcon } from '../../../assets/svg/login/hide.svg';
import { ReactComponent as ShowIcon } from '../../../assets/svg/login/show.svg';

import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const styleSuccess = {
    style: {
      border: "2px solid #28a745",
      padding: "10px",
      color: "#28a745",
      fontWeight: "500",
    },
    duration: 2000,
  };

  const styleError = {
    style: {
      border: "2px solid red",
      padding: "10px",
      color: "red",
      fontWeight: "500",
    },
    duration: 4000,
  };

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isLoading) {
      setIsLoading(true);

      const data = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      };

      axios
        .post(process.env.REACT_APP_API_HOST + "auth/login", data)
        .then((res) => {
          setIsLoading(false);

          const expirationTime = new Date(
            new Date().getTime() + +res.data.expiresTime
          );
          authCtx.login(
            res.data.token,
            expirationTime.toISOString(),
            res.data.data.user._id
          );
          toast.success("Login successfully", styleSuccess);
          setTimeout(function () {
            navigate("/", { replace: true });
          }, 2000);

        })
        .catch((err) => {
          setIsLoading(false);
          toast.error(err.response.data.message, styleError);
        });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  // get information when login with social
  const location = useLocation();
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    const expiresTime = new URLSearchParams(location.search).get("expiresTime");
    const userData = new URLSearchParams(location.search).get("userData");
    if (token) {
      const expirationTime = new Date(new Date().getTime() + +expiresTime);
      authCtx.login(
        token,
        expirationTime.toISOString(),
        JSON.parse(userData)._id
      );
      navigate("/", { replace: true });
    }
  }, [location.search]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={submitHandler}
        className="p-5 w-[450px]"
      >
        <h1 className="text-4xl">Welcome back !</h1>
        <p className="mt-3 text-lg">
          Enter to get unlimited access to all features
        </p>

        <div className="mb-5 mt-8">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            ref={emailInputRef}
            required
            className={`w-full h-12 px-4 rounded-lg border-2 border-colorBorder`}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <div className="relative flex justify-end items-center">
            <input
              ref={passwordInputRef}
              required
              className={`w-full h-12 px-4 rounded-lg border-2 border-colorBorder `}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
            />
            {!showPassword ? (
              <div className="absolute right-8 top-3 w-5 h-5 ml-2 cursor-pointer" onClick={handleShowPassword}>
                <ShowIcon />
              </div>
            ) : (
              <div className="absolute right-8 top-3 w-5 h-5 ml-2 cursor-pointer" onClick={handleShowPassword}>
                <HideIcon />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="text-blue font-bold text-sm" onClick={() => { navigate("/forget-password") }}>
            Forgot your password ?
          </button>
        </div>

        <button
          className="bg-blue text-white py-2 px-4 h-12 rounded-lg w-full mt-6 flex items-center justify-center"
          type="submit"
        >
          {isLoading ? (
            <BeatLoader
              color="#ffffff"
              margin={2}
              size={9}
              speedMultiplier={0.5}
            />
          ) : <div>Login</div>}
        </button>

        <div className="flex justify-center items-center mt-8 mb-0 gap-4">
          <div className="w-1/4 bg-gray-200 border border-colorBorder"> </div>
          <p>Or</p>
          <div className="w-1/4 bg-gray-200 border border-colorBorder"> </div>
        </div>

        <a
          className="py-2 px-4 h-12 rounded-lg border-2 border-colorBorder w-full mt-6 flex items-center justify-center gap-3"
          type="submit"
          href={`${process.env.REACT_APP_API_HOST}auth/google`}
        >
          <GoogleIcon />
          <div className='text-blue'>Continue with Google</div>
        </a>

        <div className="flex gap-1 mt-7 justify-center">
          <p >Don't have an account?</p>
          <button className="text-blue font-bold underline underline-offset-4" onClick={() => { navigate("/register") }}>
            Sign up
          </button>
        </div>

      </form>
    </div>
  );
}

export default Login;
