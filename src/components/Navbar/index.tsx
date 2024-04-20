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
import { useContext, useState } from 'react';
import LoginModal from '../../modules/home/components/LoginModal';
import { LoginContext, LoginContextReturn } from '../../context/Login';
import Gallery from '../Gallery';
import { getImages } from '../../helpers/getImages';

type NavbarProps = { userProfile: UserProfile; showButtons?: boolean };

const Navbar: React.FC<NavbarProps> = ({ userProfile, showButtons = true }) => {
  const navigator = useNavigate();
  const loginContext = useContext(LoginContext);

  const [open, setOpen] = useState(false);
  const [openGallery, setOpenGallery] = useState(false);

  const { handleLogin, isLogged } = loginContext as LoginContextReturn;

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
        {showButtons && (
          <StyledActionContainer>
            <StyledButton
              onClick={() => {
                if (isLogged)
                  navigator({ pathname: `/user/${userProfile?.userMap}/edit` });
                else setOpen(true);
              }}
              disabled
            >
              Entrar
            </StyledButton>
            <StyledButton onClick={() => setOpenGallery(true)}>
              Galeria
            </StyledButton>
            <StyledButton onClick={handleBack}>Voltar</StyledButton>
          </StyledActionContainer>
        )}
      </StyledWrapper>

      <Gallery
        images={getImages()}
        isOpen={openGallery}
        onClose={() => setOpenGallery(false)}
      />

      {open && (
        <LoginModal
          id={userProfile?.userMap}
          handleSave={handleLogin}
          isOpen
          onClose={() => setOpen(false)}
        />
      )}
    </StyledNavbarContainer>
  );
};

export default Navbar;
