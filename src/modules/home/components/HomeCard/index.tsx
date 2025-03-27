import Map from '../../../../components/Map';
import Box from '../../../../foundation/Box';
import { User } from '../../../../types';
import { StyledContainer, StyledMapWrapper } from './styles';

type HomeCardProps = { user: User };

const HomeCard: React.FC<HomeCardProps> = ({ user }) => {
  return (
    <StyledContainer>
      <StyledMapWrapper width="100%" height="70%" overflow="hidden">
        <Map user={user} />
      </StyledMapWrapper>
      <Box width="100%" height="30%">
        -
      </Box>
    </StyledContainer>
  );
};

export default HomeCard;
