import EditSidebar from '../EditSidebar';
import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { Image, Marker, UserProfile } from '../../../../types';
import Navbar from '../../../../components/Navbar';
import { useState } from 'react';
import useEditLine from '../../helpers/useEditLine';
import useEditMarker from '../../helpers/useEditMarker';

type EditMapProps = { userProfile: UserProfile };

const EditMap: React.FC<EditMapProps> = ({ userProfile }) => {
  const [showMarker, setShowMarker] = useState(true);
  const [user, setUser] = useState<UserProfile>(userProfile);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<Image[]>([]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [lineId, setLineId] = useState(0);
  const [markerId, setMarkerId] = useState(0);

  const lineFunctions = useEditLine({ user, lineId, setUser, setLineId });
  const markerFunctions = useEditMarker({ markerId, markers, setMarkers });

  const handleToggleMarker = () => {
    setMarkerId(0);
    setShowMarker(!showMarker);
  };

  return (
    <StyledContainer>
      <Map
        userProfile={user}
        markers={markers}
        editLineId={lineId}
        editMarkerId={markerId}
        showMarker={showMarker}
        setMarkerId={setMarkerId}
        setLineId={setLineId}
        handleToggleMarker={handleToggleMarker}
        handleAppendLine={lineFunctions?.handleAppendLine}
        handleAddPoint={markerFunctions?.handleAddPoint}
        handleMarkerPosition={markerFunctions?.handleMarkerPosition}
      />
      <EditSidebar
        userProfile={user}
        markerId={markerId}
        lineId={lineId}
        markers={markers}
        images={images}
        setMarkerId={setMarkerId}
        setLineId={setLineId}
        handleDeleteLine={lineFunctions?.handleDeleteLine}
        handleInsertLine={lineFunctions?.handleInsertLine}
        handleUndoLine={lineFunctions?.handleUndoLine}
        handleInsertMarker={markerFunctions?.handleInsertMarker}
      />
      <Navbar userProfile={userProfile} showButtons={false} />
    </StyledContainer>
  );
};

export default EditMap;
