import { useNavigate } from 'react-router-dom';
import { User } from '../../../../types';
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

type ProfileCardProps = { user: User };

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const navigator = useNavigate();

  const handleClick = () => navigator({ pathname: `/user/${user?.userMap}` });

  return (
    <StyledProfileContainer>
      <Map defaultZoom={9} user={user} />
      <StyledProfileOverlay>
        <StyledOverlayWrapper onClick={handleClick}>
          <StyledProfileContent className="profile-content">
            <StyledAvatar src={user?.image} />
            <StyledProfileInformations className="profile-informations">
              <StyledName>{user?.name}</StyledName>
              <StyledVehicle>{user?.vehicle}</StyledVehicle>
            </StyledProfileInformations>
          </StyledProfileContent>
        </StyledOverlayWrapper>
      </StyledProfileOverlay>
    </StyledProfileContainer>
  );
};

export default ProfileCard;
