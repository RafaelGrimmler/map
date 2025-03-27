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
    text: { primary: '#262626' },
    divider: { main: rgba('#000000', 0.16) },
    common: { black: '#000000', white: '#ffffff' },
  };

  return extendTheme({ palette, isDarkMode, changeMode });
};
