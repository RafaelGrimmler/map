import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../../../types';
import Map from '../../../../components/Map';
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
    navigator({ pathname: `/user/${userProfile?.userMap}` });

  return (
    <StyledProfileContainer>
      <Map defaultZoom={9} userProfile={userProfile} hiddenToggleMarker />
      <StyledProfileOverlay>
        <StyledOverlayWrapper onClick={handleClick}>
          <StyledProfileContent className="profile-content">
            <StyledAvatar src={userProfile?.image} />
            <StyledProfileInformations className="profile-informations">
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
