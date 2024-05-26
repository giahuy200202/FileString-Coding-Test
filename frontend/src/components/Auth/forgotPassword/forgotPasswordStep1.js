
import { useState, useRef, useContext } from 'react';

import axios from 'axios'
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import { ReactComponent as BackIcon } from '../../../assets/svg/auth/back.svg'
import { styleError, styleSuccess } from "../../../helpers/toastStyle";

import AuthContext from '../../../store/authContext';

const forgotPasswordStep1 = () => {

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const submitEmailHandler = (event) => {
    event.preventDefault()
    if (!isLoading) {
      setIsLoading(true)

      const step = authCtx.forgotPasswordStep;

      const data = {
        step,
        email: emailInputRef.current.value
      };

      axios.post(process.env.REACT_APP_API_HOST + "auth/forgot-password", data)
        .then(res => {
          setIsLoading(false)
          authCtx.setForgotPasswordStep(2);
          authCtx.setForgotPasswordEmail(data.email)
        })
        .catch(err => {
          setIsLoading(false);
          toast.error(err.response.data.message, styleError);
        })
    }
  }

  return (
    <form
      onSubmit={submitEmailHandler}
      className="p-12 w-[520px] rounded-2xl border-2 border-colorBorder bg-white"
    >
      <h1 className="text-4xl">Forgot password</h1>
      <p className="mt-3 text-lg">
        No worries, we will send you reset instructions.
      </p>

      <div className="mb-5 mt-8">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          ref={emailInputRef}
          required
          className={`w-full h-12 px-4 rounded-lg border-2 border-colorBorder`}
          type="text"
          id="email"
          placeholder="Enter your email"
        />
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

      <div className="flex gap-2 mt-7 justify-center items-center	cursor-pointer" onClick={() => { navigate("/login") }}>
        <BackIcon />
        <div className="text-blue underline underline-offset-4" >
          Back
        </div>
      </div>
    </form>
  );
}

export default forgotPasswordStep1;