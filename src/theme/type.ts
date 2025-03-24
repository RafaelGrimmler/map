export type Palette = {
  action: { hover: string };
  primary: { light: string; main: string; dark: string };
  common: { black: string; white: string };
};

export type Theme = {
  palette: Palette;
  handleToggleDarkMode: () => void;
};
