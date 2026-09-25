import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';
import { StyledButton } from './styles';
import { ReactNode } from 'react';

type ButtonProps = {
  size?: ChakraButtonProps['size'];
  disabled?: boolean;
  children: ReactNode;
  contained?: boolean;
  onClick?: ChakraButtonProps['onClick'];
};

const Button: React.FC<ButtonProps> = (props) => {
  return <StyledButton $contained={props?.contained} {...props} />;
};

export default Button;
