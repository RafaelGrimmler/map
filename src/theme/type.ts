export type Palette = {
  text: { primary: string };
  background: { main: string };
  primary: { light: string; main: string; dark: string };
  common: { black: string; white: string };
};

export type Theme = {
  palette: Palette;
  isDarkMode: boolean;
  changeMode: () => void;
};
