import { Input as ChakraInput, InputProps } from '@chakra-ui/react';

const Input: React.FC<InputProps> = (props) => {
  return (
    <ChakraInput
      {...props}
      borderColor="gray.900"
      _hover={{ borderColor: 'gray.800' }}
    />
  );
};

export default Input;
