import EditSidebar from '../EditSidebar';
import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { Line, UserProfile } from '../../../../types';
import Navbar from '../../../../components/Navbar';
import { useState } from 'react';
import { LatLng } from 'leaflet';

type EditMapProps = { userProfile: UserProfile };

const EditMap: React.FC<EditMapProps> = ({ userProfile }) => {
  const [user, setUser] = useState<UserProfile>(userProfile);
  const [lineId, setLineId] = useState(0);

  const handleInsertLine = (line: Line) => {
    setUser({ ...user, lines: [...user?.lines, line] });
  };

  const handleAppendLine = (coord: LatLng) => {
    const { lat, lng } = coord || {};

    const lines = user?.lines?.map((line) => {
      if (line?.id === lineId)
        return { id: lineId, lines: [...line?.lines, [lat, lng]] };
      return line;
    });

    setUser({ ...user, lines });
  };

  return (
    <StyledContainer>
      <Map
        userProfile={user}
        editLineId={lineId}
        handleAppendLine={handleAppendLine}
      />
      <EditSidebar
        handleInsertLine={handleInsertLine}
        lineId={lineId}
        setLineId={setLineId}
      />
      <Navbar userProfile={userProfile} showButtons={false} />
    </StyledContainer>
  );
};

export default EditMap;
