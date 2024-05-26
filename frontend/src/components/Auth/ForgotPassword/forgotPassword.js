
import { useState, useRef } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import { ReactComponent as BackIcon } from '../../../assets/svg/auth/back.svg'
import { ReactComponent as HideIcon } from '../../../assets/svg/auth/hide.svg';
import { ReactComponent as ShowIcon } from '../../../assets/svg/auth/show.svg';
import { styleError, styleSuccess } from "../../../helpers/toastStyle";


export default function ForgetPassword() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const verifyCodeRef = useRef()

  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('')

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  }

  const submitEmailHandler = (event) => {
    event.preventDefault()
    if (!isLoading) {
      setIsLoading(true)

      const data = {
        step,
        email: emailInputRef.current.value
      };

      axios.post(process.env.REACT_APP_API_HOST + "auth/forgot-password", data)
        .then(res => {
          setIsLoading(false)
          setStep(2)
          setEmail(data.email)
        })
        .catch(err => {
          setIsLoading(false);
          toast.error(err.response.data.message, styleError);
        })
    }
  }

  const submitVerifyCodeHandler = (event) => {
    event.preventDefault()
    const data = {
      step,
      code: verifyCodeRef.current.value
    };
    if (!isLoading && !isResendLoading) {
      setIsLoading(true)

      axios.post(process.env.REACT_APP_API_HOST + "auth/forgot-password", data)
        .then(res => {
          setIsLoading(false)
          setStep(3)
          setVerifyCode(res.data.code)
        })
        .catch(err => {
          setIsLoading(false)
          toast.error(err.response.data.message, styleError);
        })
    }
  }

  const submitPasswordHandler = (event) => {
    event.preventDefault()
    if (!isLoading) {
      setIsLoading(true)

      const data = {
        code: verifyCode,
        email,
        password: passwordInputRef.current.value,
        passwordConfirm: passwordConfirmInputRef.current.value,
      }

      axios.post(process.env.REACT_APP_API_HOST + "auth/forgot-password", data)
        .then(res => {
          setIsLoading(false)
          toast.success("Reset password successfully", styleSuccess);
          setTimeout(function () {
            navigate("/login", { replace: true });
          }, 2000);
        })
        .catch(err => {
          setIsLoading(false)
          toast.error(err.response.data.message, styleError);
        })
    }
  }

  const handleResend = () => {
    if (!isResendLoading) {
      setIsResendLoading(true)

      const data = {
        step: 1,
        email: email
      };

      axios.post(process.env.REACT_APP_API_HOST + "auth/forgot-password", data)
        .then(res => {
          setIsResendLoading(false)
          setStep(2)
        })
        .catch(err => {
          setIsResendLoading(false)
          toast.error(err.response.data.message, styleError);
        })
    }
  }

  return (<div className="flex justify-center items-center h-screen">
    {/* step 1 */}
    {step === 1 && <form
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


    </form>}
    {/* step 2 */}
    {step === 2 && <form
      onSubmit={submitVerifyCodeHandler}
      className="p-12 w-[520px] rounded-2xl border-2 border-colorBorder bg-white"
    >
      <h1 className="text-4xl">Forgot password</h1>
      <p className="mt-3 text-lg">We emailed you the code to <span className='text-blue'>{email}</span>. Enter the code below to reset password</p>

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
      <div className="flex gap-2 mt-7 justify-center items-center	cursor-pointer" onClick={() => { setStep(1); }}>
        <BackIcon />
        <div className="text-blue underline underline-offset-4" >
          Back
        </div>
      </div>

    </form>}
    {/* step 3 */}
    {step === 3 && <form
      onSubmit={submitPasswordHandler}
      className="p-12 w-[520px] rounded-2xl border-2 border-colorBorder bg-white"
    >
      <h1 className="text-4xl">Forgot password</h1>
      <p className="mt-3 text-lg">
        Enter new password to your account
      </p>

      <div className="mb-5 mt-8">
        <label htmlFor="password" className="block mb-2">
          New password
        </label>
        <div className="relative flex justify-end items-center">
          <input
            ref={passwordInputRef}
            required
            className={`w-full h-12 px-4 rounded-lg border-2 border-colorBorder `}
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your new password"
          />
          {!showPassword ? (
            <div className="absolute w-5 h-5 right-5 top-4 ml-2 cursor-pointer" onClick={handleShowPassword}>
              <ShowIcon />
            </div>
          ) : (
            <div className="absolute w-5 h-5 right-5 top-4 ml-2 cursor-pointer" onClick={handleShowPassword}>
              <HideIcon />
            </div>
          )}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="password" className="block mb-2">
          Confirm password
        </label>
        <div className="relative flex justify-end items-center">
          <input
            ref={passwordConfirmInputRef}
            required
            className={`w-full h-12 px-4 rounded-lg border-2 border-colorBorder `}
            type={showPasswordConfirm ? "text" : "password"}
            id="passwordConfirm"
            placeholder="Enter your new password again"
          />
          {!showPasswordConfirm ? (
            <div className="absolute w-5 h-5 right-5 top-4 ml-1 cursor-pointer" onClick={handleShowPasswordConfirm}>
              <ShowIcon />
            </div>
          ) : (
            <div className="absolute w-5 h-5 right-5 top-4 ml-1 cursor-pointer" onClick={handleShowPasswordConfirm}>
              <HideIcon />
            </div>
          )}
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
      <div className="flex gap-2 mt-7 justify-center items-center	cursor-pointer" onClick={() => { setStep(1); }}>
        <BackIcon />
        <div className="text-blue underline underline-offset-4" >
          Back
        </div>
      </div>

    </form>}
  </div>);
}