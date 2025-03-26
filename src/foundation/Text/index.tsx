import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from '@chakra-ui/react';

export type TextProps = ChakraTextProps;

const Text: React.FC<TextProps> = (props) => {
  return <ChakraText {...props} />;
};

export default Text;
