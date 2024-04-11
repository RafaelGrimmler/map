import { UserProfile } from '../../../../types';
import ProfileCard from '../ProfileCard';
import { StyledContainer } from './styles';

type UserSelectProps = { userProfiles: UserProfile[] };

const UserSelect: React.FC<UserSelectProps> = ({ userProfiles }) => {
  return (
    <StyledContainer>
      {userProfiles?.map((userProfile) => (
        <ProfileCard key={userProfile?.userMap} userProfile={userProfile} />
      ))}
    </StyledContainer>
  );
};

export default UserSelect;
