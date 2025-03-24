import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    1: '#17223B',
    2: '#263859',
    3: '#6B778D',
    4: '#2ECC71',
    5: '#2ecc9d',
    error: '#ff3333',
  },
};

const darkPalette = { background: 'black' };
const lightPalette = { background: 'white' };

export const getTheme = ({
  handleToggleDarkMode,
  isDarkMode,
}: {
  isDarkMode: boolean;
  handleToggleDarkMode: () => void;
}) => {
  const palette = isDarkMode ? darkPalette : lightPalette;

  return extendTheme({ colors, palette, handleToggleDarkMode });
};
