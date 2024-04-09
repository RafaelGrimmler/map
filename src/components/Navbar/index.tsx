import { Text } from '@chakra-ui/react';
import { UserProfile } from '../../types';
import {
  StyledActionContainer,
  StyledAvatar,
  StyledButton,
  StyledHeader,
  StyledNameContainer,
  StyledNavbarContainer,
  StyledWrapper,
} from './styles';
import { useNavigate } from 'react-router-dom';

type NavbarProps = { userProfile?: UserProfile };

const Navbar: React.FC<NavbarProps> = ({ userProfile }) => {
  const navigator = useNavigate();

  const handleBack = () => navigator({ pathname: `/` });

  return (
    <StyledNavbarContainer>
      <StyledWrapper>
        <StyledHeader>
          <StyledNameContainer>
            <Text>{userProfile?.name}</Text>
          </StyledNameContainer>
          <StyledAvatar src={userProfile?.image} />
        </StyledHeader>
        <StyledActionContainer>
          <StyledButton isDisabled onClick={() => console.log('aqui')} disabled>
            Entrar
          </StyledButton>
          <StyledButton onClick={handleBack}>Voltar</StyledButton>
        </StyledActionContainer>
      </StyledWrapper>
    </StyledNavbarContainer>
  );
};

export default Navbar;
