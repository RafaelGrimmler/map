import { Text } from '@chakra-ui/react';
import { User } from '../../types';
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
import { useContext, useState } from 'react';
import LoginModal from '../../modules/presentation/components/LoginModal';
import { LoginContext, LoginContextReturn } from '../../context/Login';

type NavbarProps = { user: User; showButtons?: boolean };

const Navbar: React.FC<NavbarProps> = ({ user, showButtons = true }) => {
  const navigator = useNavigate();
  const loginContext = useContext(LoginContext);

  const [open, setOpen] = useState(false);

  const { handleLogin, isLogged } = loginContext as LoginContextReturn;

  const handleBack = () => navigator({ pathname: `/` });

  return (
    <StyledNavbarContainer>
      <StyledWrapper>
        <StyledHeader>
          <StyledNameContainer>
            <Text>{user?.name}</Text>
          </StyledNameContainer>
          <StyledAvatar src={user?.image} />
        </StyledHeader>
        {showButtons && (
          <StyledActionContainer>
            <StyledButton
              onClick={() => {
                if (isLogged)
                  navigator({ pathname: `/user/${user?.userMap}/edit` });
                else setOpen(true);
              }}
            >
              Entrar
            </StyledButton>
            <StyledButton onClick={handleBack}>Voltar</StyledButton>
          </StyledActionContainer>
        )}
      </StyledWrapper>

      {open && (
        <LoginModal
          id={user?.userMap}
          handleSave={handleLogin}
          isOpen
          onClose={() => setOpen(false)}
        />
      )}
    </StyledNavbarContainer>
  );
};

export default Navbar;
