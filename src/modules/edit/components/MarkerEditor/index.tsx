import { Box, Text } from '@chakra-ui/react';
import EditAccordion from '../EditAccordion';
import { getTimestamp } from '../../../../helpers/useDates';
import { Marker } from '../../../../types';
import { LuMapPin } from 'react-icons/lu';

type MarkerEditorProps = {
  markerId: number;
  hasPoints?: boolean;
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId: React.Dispatch<React.SetStateAction<number>>;
  handleInsertMarker: (e: any) => void;
};

const MarkerEditor: React.FC<MarkerEditorProps> = ({
  markerId,
  hasPoints,
  setLineId,
  setMarkerId,
  handleInsertMarker,
}) => {
  const handleCreateMarker = (): Marker => ({ id: getTimestamp(), points: [] });

  const handleClick = () => {
    setLineId(0);
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
        icon={LuMapPin}
        isSelected={!!markerId}
        handleClick={handleClick}
        panelComponent={
          <Box display="flex" flexDir="column" gap={2}>
            <Text fontWeight="bold" fontSize="12px">
              {hasPoints
                ? 'O conteúdo é salvo automaticamente!'
                : 'Clique no mapa para registrar a coordenada!'}
            </Text>
            {hasPoints && (
              <Text fontWeight="bold" fontSize="12px">
                Arraste para mudar a posição.
              </Text>
            )}
          </Box>
        }
      />
    </Box>
  );
};

export default MarkerEditor;
