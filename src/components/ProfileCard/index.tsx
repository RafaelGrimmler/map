import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../types';
import Map from '../Map';
import {
  StyledAvatar,
  StyledName,
  StyledOverlayWrapper,
  StyledProfileContainer,
  StyledProfileContent,
  StyledProfileInformations,
  StyledProfileOverlay,
  StyledVehicle,
} from './styles';

type ProfileCardProps = {
  userProfile: UserProfile;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile }) => {
  const navigator = useNavigate();

  const handleClick = () =>
    navigator({ pathname: `/map/user/${userProfile?.userMap}` });

  return (
    <StyledProfileContainer>
      <Map zoom={9} userProfile={userProfile} />
      <StyledProfileOverlay>
        <StyledOverlayWrapper onClick={handleClick}>
          <StyledProfileContent>
            <StyledAvatar src={userProfile?.image} />
            <StyledProfileInformations>
              <StyledName>{userProfile?.name}</StyledName>
              <StyledVehicle>{userProfile?.vehicle}</StyledVehicle>
            </StyledProfileInformations>
          </StyledProfileContent>
        </StyledOverlayWrapper>
      </StyledProfileOverlay>
    </StyledProfileContainer>
  );
};

export default ProfileCard;
