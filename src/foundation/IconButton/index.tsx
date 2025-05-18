import { IconButtonProps as ChakraIconButtonProps } from '@chakra-ui/react';
import { StyledIconButton } from './styles';

export type IconButtonVariant = 'contained' | 'simple';
export type IconButtonColor = 'primary' | 'neutral' | 'red';

export type IconButtonProps = {
  children: React.ReactNode;
  size?: ChakraIconButtonProps['size'];
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  onClick?: ChakraIconButtonProps['onClick'];
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  size = 'sm',
  variant = 'simple',
  color = 'primary',
  ...props
}) => {
  return (
    <StyledIconButton
      $size={size}
      aria-label="any"
      className={variant}
      $color={color}
      {...props}
    >
      {children}
    </StyledIconButton>
  );
};

export default IconButton;
