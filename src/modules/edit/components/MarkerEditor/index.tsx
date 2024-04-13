import { Box, Text } from '@chakra-ui/react';
import EditAccordion from '../EditAccordion';
import { PiMapPinLineThin } from 'react-icons/pi';
import { getTimestamp } from '../../../../helpers/useDates';
import { Marker } from '../../../../types';

type MarkerEditorProps = {
  markerId: number;
  hasPoints?: boolean;
  setMarkerId: React.Dispatch<React.SetStateAction<number>>;
  handleInsertMarker: (e: any) => void;
};

const MarkerEditor: React.FC<MarkerEditorProps> = ({
  markerId,
  hasPoints,
  setMarkerId,
  handleInsertMarker,
}) => {
  const handleCreateMarker = (): Marker => ({ id: getTimestamp(), points: [] });

  const handleClick = () => {
    if (markerId) setMarkerId(0);
    else {
      const marker = handleCreateMarker();
      setMarkerId(marker.id);
      handleInsertMarker(marker);
    }
  };

  return (
    <Box>
      <EditAccordion
        label="Marcador"
        icon={PiMapPinLineThin}
        isSelected={!!markerId}
        handleClick={handleClick}
        panelComponent={
          <Box display="flex" flexDir="column" gap={2}>
            <Text fontWeight="bold" fontSize="12px">
              {hasPoints
                ? 'O conteúdo é salvo automaticamente!'
                : 'Clique no mapa para registrar a coordenada!'}
            </Text>
          </Box>
        }
      />
    </Box>
  );
};

export default MarkerEditor;
