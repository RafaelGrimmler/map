import { useState } from 'react';
import Box from '../../../../foundation/Box';
import Button from '../../../../foundation/Button';
import IconButton from '../../../../foundation/IconButton';
import Text from '../../../../foundation/Text';
import { StyledContainer } from './styles';
import { MdClose } from 'react-icons/md';
import DeleteAlert from '../../../../components/DeleteAlert';

export type LinePanelProps = {
  onClose: () => void;
  handleDeleteLine: () => void;
  handleUndoLine: () => void;
};

const LinePanel: React.FC<LinePanelProps> = ({
  onClose,
  handleDeleteLine,
  handleUndoLine,
}) => {
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    handleDeleteLine();
    onClose();
  };

  return (
    <StyledContainer>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Text fontWeight="500">Editor de linhas</Text>
        <IconButton size="xs" onClick={onClose}>
          <MdClose />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="center">
        <Text fontSize="12px" color="textSecondary">
          Selecione pontos clicando no mapa
        </Text>
      </Box>

      <Button onClick={handleUndoLine}>Desfazer linha</Button>
      <Button onClick={() => setOpen(true)}>Deletar rota</Button>

      {open && (
        <DeleteAlert onClose={() => setOpen(false)} onConfirm={onDelete} open />
      )}
    </StyledContainer>
  );
};

export default LinePanel;
