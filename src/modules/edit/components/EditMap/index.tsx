import EditSidebar from '../EditSidebar';
import { StyledContainer } from './styles';
import Map from '../../../../components/Map';
import { Image, Marker, UserProfile } from '../../../../types';
import Navbar from '../../../../components/Navbar';
import { useState } from 'react';
import useEditLine from '../../helpers/useEditLine';
import useEditMarker from '../../helpers/useEditMarker';
import useEditImage from '../../helpers/useEditImage';

type EditMapProps = { userProfile: UserProfile };

const EditMap: React.FC<EditMapProps> = ({ userProfile }) => {
  const [showMarker, setShowMarker] = useState(true);
  const [user, setUser] = useState<UserProfile>(userProfile);
  const [images, setImages] = useState<Image[]>([
    {
      createdAt: new Date('01-02-2024'),
      id: 1,
      src: 'https://i.imgur.com/c9aDSmJ.jpg',
    },
    {
      createdAt: new Date('01-03-2024'),
      id: 11,
      src: 'https://i.imgur.com/YZMXXJF.jpg',
    },
    {
      createdAt: new Date('04-04-2024'),
      id: 2,
      src: 'https://i.imgur.com/2dmkHUG.jpg',
    },
    {
      createdAt: new Date('04-04-2024'),
      id: 3,
      src: 'https://i.imgur.com/tqznuRN.jpg',
    },
    {
      createdAt: new Date('01-05-2024'),
      id: 4,
      src: 'https://i.imgur.com/W4uErLC.jpg',
    },
    {
      createdAt: new Date('04-06-2024'),
      id: 5,
      src: 'https://i.imgur.com/ILFsq9C.jpg',
    },
    {
      createdAt: new Date('04-02-2024'),
      id: 6,
      src: 'https://i.imgur.com/F6i6wVj.jpg',
    },
    {
      createdAt: new Date('04-04-2024'),
      id: 7,
      src: 'https://i.imgur.com/SNA3FlM.jpg',
    },
    {
      createdAt: new Date('04-04-2024'),
      id: 8,
      src: 'https://i.imgur.com/RbrKUaJ.jpg',
    },
    {
      createdAt: new Date('04-04-2024'),
      id: 9,
      src: 'https://i.imgur.com/jU7ZMz5.jpg',
    },
    {
      createdAt: new Date('04-04-2024'),
      id: 10,
      src: 'https://i.imgur.com/pteC283.jpg',
    },
  ]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [lineId, setLineId] = useState(0);
  const [markerId, setMarkerId] = useState(0);

  const lineFunctions = useEditLine({ user, lineId, setUser, setLineId });
  const markerFunctions = useEditMarker({ markerId, markers, setMarkers });
  const imageFunctions = useEditImage({ images, setImages });

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
        handleInsertImage={imageFunctions?.handleInsertImage}
      />
      <Navbar userProfile={userProfile} showButtons={false} />
    </StyledContainer>
  );
};

export default EditMap;
