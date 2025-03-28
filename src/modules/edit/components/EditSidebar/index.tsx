import { StyledContainer } from './styles';
import LineEditor from '../LineEditor';
import { Line, User } from '../../../../types';
import EditAccordion from '../EditAccordion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TbBrandGooglePhotos } from 'react-icons/tb';

type EditSidebarProps = {
  lineId: number;
  user: User;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  handleUndoLine: () => void;
  handleDeleteLine: () => void;
  handleInsertLine: (line: Line) => void;
  handleDownload: () => void;
};

const EditSidebar: React.FC<EditSidebarProps> = ({
  lineId,
  user,
  setLineId,
  handleInsertLine,
  handleDeleteLine,
  handleUndoLine,
  handleDownload,
}) => {
  const navigator = useNavigate();

  const [openGallery, setOpenGallery] = useState(false);

  const handleBack = () => navigator({ pathname: `/user/${user?.userMap}` });

  const handleImages = () => {
    setLineId(0);
    setOpenGallery(true);
  };

  const selectedLine = user?.lines?.find((e) => e?.id === lineId);

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
      <EditAccordion
        label="Galeria"
        isSelected={openGallery}
        icon={TbBrandGooglePhotos}
        handleClick={handleImages}
      />
      <EditAccordion label="Download" handleClick={handleDownload} />
      <EditAccordion label="Sair" handleClick={handleBack} />
    </StyledContainer>
  );
};

export default EditSidebar;
