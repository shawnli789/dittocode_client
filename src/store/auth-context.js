import React, { useState, useEffect, useCallback } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let logoutTimer;

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem('jwt_token'));

  const userIsLoggedIn = token? true : false;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('jwt_token', token);
    logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(token) - 20000);
  };

  useEffect(() => {
    if (localStorage.getItem('jwt_token')) {
      logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(token) - 20000); 
    }
  }, [token, logoutHandler]);
  

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


const calculateRemainingTime = (token) => {
  const decoded = jwt_decode(token);
  const exp = decoded.exp * 1000;
  const currentTime = new Date().getTime();
  return exp - currentTime;
};