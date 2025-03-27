import { User } from '../../../../types';
import HomeCard from '../HomeCard';
import { StyledContainer } from './styles';

type HomeListCardProps = { users: User[] };

const HomeListCard: React.FC<HomeListCardProps> = ({ users }) => {
  return (
    <StyledContainer>
      {users?.map((user) => <HomeCard key={user?.userMap} user={user} />)}
    </StyledContainer>
  );
};

export default HomeListCard;
