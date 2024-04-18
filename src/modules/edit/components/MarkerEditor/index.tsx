import { Box, Button, Text } from '@chakra-ui/react';
import EditAccordion from '../EditAccordion';
import { getTimestamp } from '../../../../helpers/useDates';
import { Image, Marker } from '../../../../types';
import { LuMapPin } from 'react-icons/lu';
import { useState } from 'react';
import Gallery from '../../../../components/Gallery';

type MarkerEditorProps = {
  marker: Marker;
  images: Image[];
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId: React.Dispatch<React.SetStateAction<number>>;
  handleInsertMarker: (e: any) => void;
  handleMarkerImage: (ids: number[]) => void;
};

const MarkerEditor: React.FC<MarkerEditorProps> = ({
  marker,
  images,
  setLineId,
  setMarkerId,
  handleInsertMarker,
  handleMarkerImage,
}) => {
  const [open, setOpen] = useState(false);

  const handleCreateMarker = (): Marker => ({
    id: getTimestamp(),
    points: [],
    imageIds: [],
  });

  console.log(marker);

  const handleClick = () => {
    setLineId(0);
    if (marker?.id) setMarkerId(0);
    else {
      const e = handleCreateMarker();
      setMarkerId(e.id);
      handleInsertMarker(e);
    }
  };

  const hasPoints = marker?.points?.length > 0;

  return (
    <Box>
      <EditAccordion
        label="Marcador"
        icon={LuMapPin}
        isSelected={!!marker?.id}
        handleClick={handleClick}
        panelComponent={
          <Box display="flex" flexDir="column" gap={2}>
            <Text fontWeight="bold" fontSize="12px">
              {hasPoints
                ? 'O conteúdo é salvo automaticamente!'
                : 'Clique no mapa para registrar a coordenada!'}
            </Text>
            {hasPoints && (
              <Box display="flex" flexDir="column" gap={2}>
                <Text fontWeight="bold" fontSize="12px">
                  Arraste para mudar a posição.
                </Text>
                <Button onClick={() => setOpen(true)}>Gerenciar imagens</Button>
              </Box>
            )}
          </Box>
        }
      />

      {open && (
        <Gallery
          mode="SELECT"
          defaultSelect={marker?.imageIds}
          images={images}
          isOpen={open}
          handleSave={handleMarkerImage}
          onClose={() => setOpen(false)}
        />
      )}
    </Box>
  );
};

export default MarkerEditor;
