import { InputProps } from '@chakra-ui/react';
import { StyledInput } from './styles';

const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};

export default Input;
