import { extendTheme } from '@chakra-ui/react';
import { Palette } from './types';
import { rgba } from 'polished';

export const getTheme = ({
  changeMode,
  isDarkMode,
}: {
  isDarkMode: boolean;
  changeMode: () => void;
}) => {
  const palette: Palette = {
    background: { main: '#ffffff', surface: '#fafafa' },
    primary: { light: '#ffc55c', main: '#FFA500', dark: '#a16700' },
    decorative: {
      orange: { light: '#ffc55c', main: '#FFA500', dark: '#a16700' },
      red: { light: '#f76f6f', main: '#d32f2f', dark: '#9c2a2a' },
    },
    text: { primary: '#262626', secondary: '#4a4a4a' },
    divider: { main: rgba('#000000', 0.16) },
    common: { black: '#000000', white: '#ffffff' },
  };

  return extendTheme({ palette, isDarkMode, changeMode });
};
