import { ChakraProvider } from '@chakra-ui/react';
import React, { createContext, useState } from 'react';
import { getTheme } from '../theme/theme';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';

type ThemeContextProps = { children?: React.ReactNode };

export const ThemeContext = createContext({});

const ThemeProvider: React.FC<ThemeContextProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    window.localStorage.getItem('darkMode') === 'true',
  );

  const changeMode = () => {
    if (window.localStorage.getItem('darkMode') === 'true') {
      window.localStorage.setItem('darkMode', 'false');
      setIsDarkMode(false);
    } else {
      window.localStorage.setItem('darkMode', 'true');
      setIsDarkMode(true);
    }
  };

  return (
    <ThemeContext.Provider value={{}}>
      <ChakraProvider theme={getTheme({ isDarkMode, changeMode })}>
        <EmotionThemeProvider theme={getTheme({ isDarkMode, changeMode })}>
          {children}
        </EmotionThemeProvider>
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
