
import { useNavigate } from "react-router-dom";

import { useState, useRef, useContext } from 'react';
import axios from 'axios'
import AuthContext from '../../../store/authContext'

import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import { ReactComponent as BackIcon } from '../../../assets/svg/auth/back.svg'
import { styleError, styleSuccess } from "../../../helpers/toastStyle";

const ForgotPasswordStep2 = () => {

  const authCtx = useContext(AuthContext);

  const verifyCodeRef = useRef()

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitVerifyCodeHandler = (event) => {
    event.preventDefault()

    const step = authCtx.forgotPasswordStep;

    const data = {
      step,
      code: verifyCodeRef.current.value
    };
    if (!isLoading) {
      setIsLoading(true)

      axios.post(process.env.REACT_APP_API_HOST + "auth/forgot-password", data)
        .then(res => {
          setIsLoading(false)
          authCtx.setForgotPasswordStep(3)
          authCtx.setForgotPasswordCode(data.code)
        })
        .catch(err => {
          setIsLoading(false)
          toast.error(err.response.data.message, styleError);
        })
    }
  }

  const handleResend = () => {
    const data = {
      step: 1,
      email: authCtx.forgotPasswordEmail
    };
    axios.post(process.env.REACT_APP_API_HOST + "auth/forgot-password", data)
      .then(res => {
        toast.success("Resend code successfully", styleSuccess);
      })
      .catch(err => {
        toast.error(err.response.data.message, styleError);
      })
  }

  return (
    <form
      onSubmit={submitVerifyCodeHandler}
      className="p-12 w-[520px] rounded-2xl border-2 border-colorBorder bg-white"
    >
      <h1 className="text-4xl">Forgot password</h1>
      <p className="mt-3 text-lg">We emailed you the code to <span className='text-blue'>{authCtx.forgotPasswordEmail}</span>. Enter the code below to reset password</p>

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
        <div className="text-blue text-sm font-bold cursor-pointer" onClick={handleResend}>
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
        ) : <div>Confirm</div>}
      </button>
      <div className="flex gap-2 mt-7 justify-center items-center	cursor-pointer" onClick={() => { authCtx.setForgotPasswordStep(1); }}>
        <BackIcon />
        <div className="text-blue underline underline-offset-4" >
          Back
        </div>
      </div>
    </form>
  );
}

export default ForgotPasswordStep2;
