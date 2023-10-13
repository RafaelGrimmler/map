import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';

const Textarea: React.FC<TextareaProps> = (props) => {
  return (
    <ChakraTextarea
      {...props}
      borderColor="gray.900"
      _hover={{ borderColor: 'gray.800' }}
    />
  );
};

export default Textarea;
