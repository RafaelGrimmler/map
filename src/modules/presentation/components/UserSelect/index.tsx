import { User } from '../../../../types';
import ProfileCard from '../../../home/components/ProfileCard';
import { StyledContainer } from './styles';

type UserSelectProps = { users: User[] };

const UserSelect: React.FC<UserSelectProps> = ({ users }) => {
  return (
    <StyledContainer>
      {users?.map((user) => <ProfileCard key={user?.userMap} user={user} />)}
    </StyledContainer>
  );
};

export default UserSelect;
