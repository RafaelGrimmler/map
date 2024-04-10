import React, { createContext, useState } from 'react';

type LoginContextProps = { children?: React.ReactNode };

export type LoginContextReturn = {
  isLogged: boolean;
  handleLogin: () => void;
};

export const LoginContext = createContext({});

const LoginProvider: React.FC<LoginContextProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    Boolean(window.localStorage.getItem('isLogged')),
  );

  const handleLogin = () => {
    window.localStorage.setItem('isLogged', 'true');
    setIsLogged(true);
  };

  return (
    <LoginContext.Provider value={{ isLogged, handleLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
