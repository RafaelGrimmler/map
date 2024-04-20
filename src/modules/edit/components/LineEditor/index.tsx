import { GiPathDistance } from 'react-icons/gi';
import { getTimestamp } from '../../../../helpers/useDates';
import { Line } from '../../../../types';
import DeleteAlert from '../../../../components/DeleteAlert';
import { useState } from 'react';
import EditAccordion from '../EditAccordion';
import { Box, Button, Text } from '@chakra-ui/react';

type LineEditorProps = {
  lineId: number;
  hasPoints?: boolean;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId: React.Dispatch<React.SetStateAction<number>>;
  handleUndoLine: () => void;
  handleDeleteLine: () => void;
  handleInsertLine: (line: Line) => void;
};

const LineEditor: React.FC<LineEditorProps> = ({
  lineId,
  hasPoints,
  setLineId,
  setMarkerId,
  handleUndoLine,
  handleDeleteLine,
  handleInsertLine,
}) => {
  const [open, setOpen] = useState(false);

  const handleCreateLine = (): Line => ({ id: getTimestamp(), lines: [] });

  const handleClick = () => {
    setMarkerId(0);
    if (lineId) setLineId(0);
    else {
      const line = handleCreateLine();
      setLineId(line.id);
      handleInsertLine(line);
    }
  };

  return (
    <Box>
      <EditAccordion
        label="Linha"
        handleClick={handleClick}
        icon={GiPathDistance}
        isSelected={!!lineId}
        panelComponent={
          <Box display="flex" flexDir="column" gap={2}>
            <Text fontWeight="bold" fontSize="12px">
              {hasPoints
                ? 'O conteúdo é salvo automaticamente!'
                : 'Clique no mapa para registrar a coordenada!'}
            </Text>
            <Button isDisabled={!hasPoints} onClick={handleUndoLine}>
              Desfazer
            </Button>
            <Button
              isDisabled={!hasPoints}
              colorScheme="red"
              onClick={() => setOpen(true)}
            >
              Deletar
            </Button>
          </Box>
        }
      />

      {open && (
        <DeleteAlert
          onClose={() => setOpen(false)}
          open={open}
          onConfirm={handleDeleteLine}
        />
      )}
    </Box>
  );
};

export default LineEditor;
