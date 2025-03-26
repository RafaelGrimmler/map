import { BoxProps as ChakraBoxProps, Box as ChakraBox } from '@chakra-ui/react';

export type BoxProps = ChakraBoxProps;

const Box: React.FC<BoxProps> = (props) => {
  return <ChakraBox {...props} />;
};

export default Box;
