import Box from '../../foundation/Box';
import Text from '../../foundation/Text';
import { StyledContainer } from './styles';

type NavbarButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

const NavbarButton: React.FC<NavbarButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <StyledContainer onClick={onClick}>
      <Box>{icon}</Box>
      <Text fontWeight="500" fontSize="12px">
        {label}
      </Text>
    </StyledContainer>
  );
};

export default NavbarButton;
