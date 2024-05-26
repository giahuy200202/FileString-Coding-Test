import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  userData: {},
  registerStep: 1,
  registerInputData: {},
  forgotPasswordStep: 1,
  forgotPasswordEmail: '',
  forgotPasswordCode: '',

  setUserDataContext: (userDataParam) => { },
  login: (token) => { },
  logout: () => { },
  setRegisterStep: (step) => { },
  setRegisterInputData: (data) => { },
  setForgotPasswordStep: (step) => { },
  setForgotPasswordEmail: (email) => { },
  setForgotPasswordCode: (code) => { },
});

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userData, setUserData] = useState({});
  const userIsLoggedIn = !!token;

  const [step, setStep] = useState(1);
  const [registerInputData, setRegisterInputData] = useState({});

  const [forgotPasswordstep, setForgotPasswordstep] = useState(1);
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('')

  const setRegisterStepHandler = (step) => {
    setStep(step);
  };

  const setRegisterInputDataHandler = (data) => {
    setRegisterInputData(data);
  };

  const setForgotPasswordstepHandler = (step) => {
    setForgotPasswordstep(step);
  };

  const setForgotPasswordEmailHandler = (email) => {
    setEmail(email);
  };

  const setForgotPasswordCodeHandler = (code) => {
    setVerifyCode(code);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('_id');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, _id) => {

    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('_id', _id)

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const setUserDataHandler = (userDataParam) => {
    setUserData(userDataParam);
  }

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    userData: userData,
    isLoggedIn: userIsLoggedIn,
    registerStep: step,
    forgotPasswordStep: forgotPasswordstep,
    forgotPasswordEmail: email,
    forgotPasswordCode: verifyCode,
    registerInputData: registerInputData,
    setUserDataContext: setUserDataHandler,

    login: loginHandler,
    logout: logoutHandler,
    setRegisterStep: setRegisterStepHandler,
    setRegisterInputData: setRegisterInputDataHandler,
    setForgotPasswordStep: setForgotPasswordstepHandler,
    setForgotPasswordEmail: setForgotPasswordEmailHandler,
    setForgotPasswordCode: setForgotPasswordCodeHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
