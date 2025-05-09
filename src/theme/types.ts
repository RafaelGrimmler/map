import '@emotion/react';

export type Palette = {
  background: { main: string; surface: string };
  primary: { light: string; main: string; dark: string };
  decorative: {
    orange: { light: string; main: string; dark: string };
  };
  text: { primary: string; secondary: string };
  divider: { main: string };
  common: { black: string; white: string };
};

export type CustomTheme = {
  palette: Palette;
  isDarkMode: boolean;
  changeMode: () => void;
};

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {} // eslint-disable-line
}
