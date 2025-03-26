import { extendTheme } from '@chakra-ui/react';
import { Palette } from './type';

const common: Palette['common'] = { black: '#000000', white: '#ffffff' };

const darkPalette: Palette = {
  background: { main: '#262626' },
  primary: { light: '#ffc55c', main: '#FFA500', dark: '#a16700' },
  text: { primary: '#ffffff' },
  common,
};
const lightPalette: Palette = {
  background: { main: '#ffffff' },
  primary: { light: '#ffc55c', main: '#FFA500', dark: '#a16700' },
  text: { primary: '#262626' },
  common,
};

export const getTheme = ({
  changeMode,
  isDarkMode,
}: {
  isDarkMode: boolean;
  changeMode: () => void;
}) => {
  const palette = isDarkMode ? darkPalette : lightPalette;

  return extendTheme({ palette, isDarkMode, changeMode });
};
