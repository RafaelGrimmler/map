import React, { createContext, useContext, useState } from 'react';

type LoginContextProps = { children?: React.ReactNode };

export type LoginContextReturn = {
  isLogged: boolean;
  handleLogin: () => void;
};

export const LoginContext = createContext({});
export const useLogin = () => useContext(LoginContext) as LoginContextReturn;

const LoginProvider: React.FC<LoginContextProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    window.localStorage.getItem('loginToken') ===
      process.env.REACT_APP_EDIT_KEY,
  );

  const handleLogin = () => {
    window.localStorage.setItem(
      'loginToken',
      process.env.REACT_APP_EDIT_KEY || '',
    );
    setIsLogged(true);
  };

  return (
    <LoginContext.Provider value={{ isLogged, handleLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
