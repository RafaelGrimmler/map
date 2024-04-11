import { StyledContainer } from './styles';
import LineEditor from '../LineEditor';
import { Line } from '../../../../types';

type EditSidebarProps = {
  lineId: number;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  handleInsertLine: (line: Line) => void;
};

const EditSidebar: React.FC<EditSidebarProps> = ({
  lineId,
  setLineId,
  handleInsertLine,
}) => {
  return (
    <StyledContainer>
      <LineEditor
        handleInsertLine={handleInsertLine}
        lineId={lineId}
        setLineId={setLineId}
      />
    </StyledContainer>
  );
};

export default EditSidebar;
