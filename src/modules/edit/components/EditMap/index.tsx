import EditSidebar from '../EditSidebar';
import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { Image, Marker, UserProfile } from '../../../../types';
import Navbar from '../../../../components/Navbar';
import { useState } from 'react';
import useEditLine from '../../helpers/useEditLine';
import useEditMarker from '../../helpers/useEditMarker';
import useEditImage from '../../helpers/useEditImage';
import { downloadFiles } from '../../../../helpers/downloadFiles';

type EditMapProps = {
  userProfile: UserProfile;
  defaultImages: Image[];
  defaultMarkers: Marker[];
};

const EditMap: React.FC<EditMapProps> = ({
  userProfile,
  defaultImages = [],
  defaultMarkers = [],
}) => {
  const [user, setUser] = useState<UserProfile>(userProfile);
  const [images, setImages] = useState<Image[]>(defaultImages);
  const [markers, setMarkers] = useState<Marker[]>(defaultMarkers);

  const [lineId, setLineId] = useState(0);
  const [markerId, setMarkerId] = useState(0);

  const lineFunctions = useEditLine({ user, lineId, setUser, setLineId });
  const markerFunctions = useEditMarker({ markerId, markers, setMarkers });
  const imageFunctions = useEditImage({ images, setImages });

  const handleDownload = () => downloadFiles({ user, images, markers });

  return (
    <StyledContainer>
      <Map
        userProfile={user}
        markers={markers}
        images={images}
        editLineId={lineId}
        editMarkerId={markerId}
        setMarkerId={setMarkerId}
        setLineId={setLineId}
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
        handleMarkerImage={markerFunctions?.handleMarkerImage}
        handleMarkerRadius={markerFunctions?.handleMarkerRadius}
        handleDeleteMarker={markerFunctions?.handleDeleteMarker}
        handleInsertImage={imageFunctions?.handleInsertImage}
        handleDownload={handleDownload}
      />
      <Navbar userProfile={userProfile} showButtons={false} />
    </StyledContainer>
  );
};

export default EditMap;
