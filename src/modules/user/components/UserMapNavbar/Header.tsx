import { Img } from '@chakra-ui/react';
import { User } from '../../../../types';
import { StyledHeader, StyledHeaderTextContainer } from './styles';
import Text from '../../../../foundation/Text';
import Box from '../../../../foundation/Box';
import { FaYoutube } from 'react-icons/fa';

type HeaderProps = { user: User };

const Header: React.FC<HeaderProps> = ({ user }) => {
  const youtube = user?.profile?.youtube;

  return (
    <StyledHeader>
      <Img src={user?.profile?.image} alt="User image" id="header-user-image" />
      <StyledHeaderTextContainer>
        <Box display="flex" width="100%" gap="4px" alignItems="center">
          <Text id="header-user-name">{user?.profile?.name}</Text>
          {youtube && (
            <a
              href={youtube}
              target="_blank"
              rel="noreferrer"
              id="youtube-link"
            >
              <FaYoutube />
            </a>
          )}
        </Box>
        <Box display="flex" width="100%" gap="4px" alignItems="center">
          <Text id="header-vehicle-name">{user?.vehicles?.[0]?.name}</Text>
        </Box>
      </StyledHeaderTextContainer>
    </StyledHeader>
  );
};

export default Header;
