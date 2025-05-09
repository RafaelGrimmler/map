import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { StyledButton } from './styles';
import { ReactNode } from 'react';

type ButtonProps = {
  size?: ChakraButtonProps['size'];
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
