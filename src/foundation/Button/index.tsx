import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { StyledButton } from './styles';

type ButtonProps = {
  size: ChakraButtonProps['size'];
};

const Button: React.FC<ButtonProps> = ({ size }) => {
  return <StyledButton size={size} />;
};

export default Button;
