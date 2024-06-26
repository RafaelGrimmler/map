import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import EditAccordion from '../EditAccordion';
import { getTimestamp } from '../../../../helpers/useDates';
import { Image, Marker } from '../../../../types';
import { LuMapPin } from 'react-icons/lu';
import { useState } from 'react';
import Gallery from '../../../../components/Gallery';
import DeleteAlert from '../../../../components/DeleteAlert';

type MarkerEditorProps = {
  marker: Marker;
  images: Image[];
  setLineId: React.Dispatch<React.SetStateAction<number>>;
  setMarkerId: React.Dispatch<React.SetStateAction<number>>;
  handleInsertMarker: (e: any) => void;
  handleMarkerImage: (ids: number[]) => void;
  handleMarkerRadius: (radius: number) => void;
  handleDeleteMarker: () => void;
};

const MarkerEditor: React.FC<MarkerEditorProps> = ({
  marker,
  images,
  setLineId,
  setMarkerId,
  handleInsertMarker,
  handleMarkerImage,
  handleMarkerRadius,
  handleDeleteMarker,
}) => {
  const [open, setOpen] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleCreateMarker = (): Marker => ({
    id: getTimestamp(),
    points: [],
    imageIds: [],
    radius: 2500,
  });

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
                <Text fontWeight="bold" fontSize="12px">
                  Área do marcador:
                </Text>
                <Slider
                  aria-label="slider-ex-6"
                  defaultValue={(marker?.radius - 1000) / 30}
                  onChange={(val) => handleMarkerRadius(1000 + val * 30)}
                >
                  <SliderTrack>
                    <SliderFilledTrack bg="#2ecc9d" />
                  </SliderTrack>
                  <SliderThumb bg="#b8f2d1" />
                </Slider>
                <Button onClick={() => setOpen(true)}>Gerenciar imagens</Button>
                <Button
                  colorScheme="red"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  Deletar
                </Button>
              </Box>
            )}
          </Box>
        }
      />

      <Gallery
        mode="SELECT"
        defaultSelect={marker?.imageIds}
        images={images}
        isOpen={open}
        handleSave={handleMarkerImage}
        onClose={() => setOpen(false)}
      />

      {openDeleteAlert && (
        <DeleteAlert
          onClose={() => setOpenDeleteAlert(false)}
          open
          onConfirm={handleDeleteMarker}
        />
      )}
    </Box>
  );
};

export default MarkerEditor;
