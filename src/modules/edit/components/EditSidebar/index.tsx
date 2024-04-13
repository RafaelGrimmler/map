import { StyledContainer } from './styles';
import LineEditor from '../LineEditor';
import { Line, Marker, UserProfile } from '../../../../types';
import EditAccordion from '../EditAccordion';
import { useNavigate } from 'react-router-dom';
import MarkerEditor from '../MarkerEditor';

type EditSidebarProps = {
  lineId: number;
  markerId: number;
  markers: Marker[];
  userProfile: UserProfile;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId: React.Dispatch<React.SetStateAction<number>>;
  handleUndoLine: () => void;
  handleDeleteLine: () => void;
  handleInsertLine: (line: Line) => void;
  handleInsertMarker: (marker: Marker) => void;
};

const EditSidebar: React.FC<EditSidebarProps> = ({
  lineId,
  markers,
  markerId,
  userProfile,
  setLineId,
  setMarkerId,
  handleInsertLine,
  handleDeleteLine,
  handleUndoLine,
  handleInsertMarker,
}) => {
  const navigator = useNavigate();

  const handleBack = () =>
    navigator({ pathname: `/user/${userProfile?.userMap}` });

  const selectedLine = userProfile?.lines?.find((e) => e?.id === lineId) as any;
  const selectedMarker = markers?.find((e) => e?.id === markerId) as any;

  return (
    <StyledContainer>
      <LineEditor
        hasPoints={selectedLine?.lines?.length > 0}
        lineId={lineId}
        setLineId={setLineId}
        handleDeleteLine={handleDeleteLine}
        handleInsertLine={handleInsertLine}
        handleUndoLine={handleUndoLine}
      />
      <MarkerEditor
        markerId={markerId}
        hasPoints={selectedMarker?.points?.length > 0}
        setMarkerId={setMarkerId}
        handleInsertMarker={handleInsertMarker}
      />
      <EditAccordion label="Sair" handleClick={handleBack} />
    </StyledContainer>
  );
};

export default EditSidebar;
