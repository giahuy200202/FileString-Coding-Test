

import { useNavigate } from "react-router-dom";

import { useState, useRef, useContext } from 'react';
import axios from 'axios'
import AuthContext from '../../../store/authContext'

import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import { ReactComponent as BackIcon } from '../../../assets/svg/auth/back.svg'
import { styleError, styleSuccess } from "../../../helpers/toastStyle";

const RegisterStep2 = () => {

  const verifyCodeRef = useRef()

  const authCtx = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const submitVerifyCodeHandler = (event) => {
    event.preventDefault()
    if (!isLoading) {
      setIsLoading(true)
      // console.log(data)

      axios.post(process.env.REACT_APP_API_HOST + "auth/verify", { code: verifyCodeRef.current.value, data: authCtx.registerInputData })
        .then(res => {
          setIsLoading(false)
          // console.log(res)
          const expirationTime = new Date(
            new Date().getTime() + +res.data.expiresTime
          );
          authCtx.login(res.data.token, expirationTime.toISOString(), res.data.data.user.role, res.data.data.user._id);
          toast.success('Register successfully', styleSuccess);
          setTimeout(function () {
            navigate("/", { replace: true });
            authCtx.setRegisterStep(1);
            authCtx.setUserDataContext({});
          }, 2000);

        })
        .catch(err => {
          setIsLoading(false)
          toast.error(err.response.data.message, styleError);
        })
    }
  }

  const handleResendCode = () => {
    axios.post(process.env.REACT_APP_API_HOST + "auth/register", authCtx.registerInputData)
      .then(res => {
        toast.success('Resend code successfully', styleSuccess);
      })
      .catch(err => {
        // const message = err.response.data.message
        toast.error(err.response.data.message, styleError);
      })
  }

  return (
    <form
      onSubmit={submitVerifyCodeHandler}
      className="p-12 w-[520px] rounded-2xl border-2 border-colorBorder bg-white"
    >
      <h1 className="text-4xl">Register</h1>
      <p className="mt-3 text-lg">
        Please verify your email
      </p>

      <div className="mb-5 mt-8">
        <label htmlFor="email" className="block mb-2">
          Code
        </label>
        <input
          ref={verifyCodeRef}
          required
          className={`w-full h-12 px-4 rounded-lg border-2 border-colorBorder`}
          type="text"
          id="otp"
          placeholder="Enter your verify code"
        />
      </div>

      <div className="flex justify-end">
        <div className="text-blue text-sm font-bold cursor-pointer" onClick={handleResendCode}>
          Resend verify code
        </div>
      </div>

      <button
        className="mt-12 bg-blue text-white py-2 px-4 h-12 rounded-lg w-full flex items-center justify-center"
        type="submit"
      >
        {isLoading ? (
          <BeatLoader
            color="#ffffff"
            margin={2}
            size={9}
            speedMultiplier={0.5}
          />
        ) : <div>Verify</div>}
      </button>

      <div className="flex gap-2 mt-7 justify-center items-center	cursor-pointer" onClick={() => { authCtx.setRegisterStep(1); }}>
        <BackIcon />
        <div className="text-blue underline underline-offset-4" >
          Back
        </div>
      </div>
    </form>
  );
}

export default RegisterStep2;
