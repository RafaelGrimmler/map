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
  console.log(userProfile);

  return (
    <StyledProfileContainer>
      <Map zoom={9} userProfile={userProfile} />
      <StyledProfileOverlay>
        <StyledOverlayWrapper>
          <StyledProfileContent>
            <StyledAvatar />
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
