import EditSidebar from '../EditSidebar';
import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { UserProfile } from '../../../../types';

type EditMapProps = { userProfile?: UserProfile };

const EditMap: React.FC<EditMapProps> = ({ userProfile }) => {
  return (
    <StyledContainer>
      <EditSidebar />
      <Map userProfile={userProfile} />
    </StyledContainer>
  );
};

export default EditMap;
