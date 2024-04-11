import { StyledContainer } from './styles';
import LineEditor from '../LineEditor';
import { Line, UserProfile } from '../../../../types';
import EditAccordion from '../EditAccordion';
import { useNavigate } from 'react-router-dom';
import MarkEditor from '../MarkEditor';

type EditSidebarProps = {
  lineId: number;
  userProfile: UserProfile;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  handleUndoLine: () => void;
  handleDeleteLine: () => void;
  handleInsertLine: (line: Line) => void;
};

const EditSidebar: React.FC<EditSidebarProps> = ({
  lineId,
  userProfile,
  setLineId,
  handleInsertLine,
  handleDeleteLine,
  handleUndoLine,
}) => {
  const navigator = useNavigate();

  const handleBack = () =>
    navigator({ pathname: `/user/${userProfile?.userMap}` });

  const selectedLine = userProfile?.lines?.find((e) => e?.id === lineId) as any;

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
      <MarkEditor />
      <EditAccordion label="Sair" handleClick={handleBack} />
    </StyledContainer>
  );
};

export default EditSidebar;
