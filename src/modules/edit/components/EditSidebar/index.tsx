import { StyledContainer } from './styles';
import LineEditor from '../LineEditor';
import { Image, Line, Marker, UserProfile } from '../../../../types';
import EditAccordion from '../EditAccordion';
import { useNavigate } from 'react-router-dom';
import MarkerEditor from '../MarkerEditor';
import { useState } from 'react';
import Gallery from '../../../../components/Gallery';
import { TbBrandGooglePhotos } from 'react-icons/tb';

type EditSidebarProps = {
  lineId: number;
  markerId: number;
  markers: Marker[];
  images: Image[];
  userProfile: UserProfile;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId: React.Dispatch<React.SetStateAction<number>>;
  handleUndoLine: () => void;
  handleDeleteLine: () => void;
  handleInsertLine: (line: Line) => void;
  handleInsertMarker: (marker: Marker) => void;
  handleInsertImage: (src: string) => void;
  handleMarkerImage: (ids: number[]) => void;
  handleMarkerRadius: (radius: number) => void;
  handleDeleteMarker: () => void;
  handleDownload: () => void;
};

const EditSidebar: React.FC<EditSidebarProps> = ({
  lineId,
  markers,
  markerId,
  images,
  userProfile,
  setLineId,
  setMarkerId,
  handleInsertLine,
  handleDeleteLine,
  handleUndoLine,
  handleInsertMarker,
  handleInsertImage,
  handleMarkerImage,
  handleMarkerRadius,
  handleDeleteMarker,
  handleDownload,
}) => {
  const navigator = useNavigate();

  const [openGallery, setOpenGallery] = useState(false);

  const handleBack = () =>
    navigator({ pathname: `/user/${userProfile?.userMap}` });

  const handleImages = () => {
    setMarkerId(0);
    setLineId(0);
    setOpenGallery(true);
  };

  const selectedLine = userProfile?.lines?.find((e) => e?.id === lineId) as any;
  const selectedMarker = markers?.find((e) => e?.id === markerId) as any;

  return (
    <StyledContainer>
      <LineEditor
        hasPoints={selectedLine?.lines?.length > 0}
        lineId={lineId}
        setLineId={setLineId}
        setMarkerId={setMarkerId}
        handleDeleteLine={handleDeleteLine}
        handleInsertLine={handleInsertLine}
        handleUndoLine={handleUndoLine}
      />
      <MarkerEditor
        marker={selectedMarker}
        images={images}
        setLineId={setLineId}
        setMarkerId={setMarkerId}
        handleInsertMarker={handleInsertMarker}
        handleMarkerImage={handleMarkerImage}
        handleMarkerRadius={handleMarkerRadius}
        handleDeleteMarker={handleDeleteMarker}
      />
      <EditAccordion
        label="Galeria"
        isSelected={openGallery}
        icon={TbBrandGooglePhotos}
        handleClick={handleImages}
      />
      <EditAccordion label="Download" handleClick={handleDownload} />
      <EditAccordion label="Sair" handleClick={handleBack} />
      {openGallery && (
        <Gallery
          images={images}
          mode="EDIT"
          isOpen={openGallery}
          onClose={() => setOpenGallery(false)}
          handleInsertImage={handleInsertImage}
        />
      )}
    </StyledContainer>
  );
};

export default EditSidebar;
