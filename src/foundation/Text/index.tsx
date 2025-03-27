import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

export type TextProps = { color?: 'textPrimary' } & Omit<
  ChakraTextProps,
  'color'
>;

const Text: React.FC<TextProps> = ({ color = 'textPrimary', ...props }) => {
  const { palette } = useTheme();

  const colors = {
    textPrimary: palette.text.primary,
  };

  return <ChakraText {...props} color={colors[color]} />;
};

export default Text;
