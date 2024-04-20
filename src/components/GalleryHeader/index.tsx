import { Box, Button, Text } from '@chakra-ui/react';

import { IoClose } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import GalleryPopover from '../GalleryPopover';
import { IoMdReturnLeft } from 'react-icons/io';
import { StyledButton, StyledContainer, StyledIconButton } from './styles';
import { Image } from '../../types';
import { useState } from 'react';
import { clickElements } from '../../helpers/utils';
import DeleteAlert from '../DeleteAlert';

type GalleryHeaderProps = {
  image: Image | undefined;
  mode?: 'VIEW' | 'EDIT' | 'SELECT';
  selectedLength?: number;
  setImage: React.Dispatch<React.SetStateAction<Image | undefined>>;
  setPreviousId: React.Dispatch<React.SetStateAction<number>>;
  handleClose: () => void;
  handleInsertImage?: (src: string) => void;
  handleSave?: () => void;
};

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  image,
  mode,
  selectedLength = 0,
  setImage,
  setPreviousId,
  handleClose,
  handleInsertImage,
  handleSave,
}) => {
  const [open, setOpen] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleOpen = () => {
    clickElements('.gallery-form-close');
    setOpen(true);
  };

  return (
    <StyledContainer>
      <Box display="flex" gap={3}>
        {image?.id && (
          <StyledIconButton
            aria-label="aria-back"
            onClick={() => {
              setPreviousId(image?.id);
              setImage(undefined);
            }}
            icon={<IoMdReturnLeft fontSize="20px" />}
          />
        )}
        <Text>Galeria</Text>
      </Box>

      <Box display="flex" gap={2}>
        {mode !== 'VIEW' && <Text>{selectedLength} imagens selecionadas</Text>}
        {mode === 'SELECT' && (
          <StyledButton onClick={() => handleSave?.()}>Salvar</StyledButton>
        )}
        {mode === 'EDIT' && (
          <>
            <Button
              colorScheme="red"
              height="32px"
              isDisabled={selectedLength === 0}
              onClick={() => setOpenDeleteAlert(true)}
            >
              Deletar
            </Button>
            <GalleryPopover
              open={open}
              setOpen={setOpen}
              handleSave={(t: string) => handleInsertImage?.(t)}
            >
              <StyledButton
                iconSpacing={1}
                onClick={handleOpen}
                rightIcon={<MdAdd fontSize="20px" />}
              >
                Adicionar
              </StyledButton>
            </GalleryPopover>
          </>
        )}
        <StyledIconButton
          aria-label="aria-close"
          onClick={handleClose}
          icon={<IoClose fontSize="28px" />}
        />
      </Box>

      {openDeleteAlert && (
        <DeleteAlert
          onClose={() => setOpenDeleteAlert(false)}
          open
          onConfirm={() => console.log('delte images')}
        />
      )}
    </StyledContainer>
  );
};

export default GalleryHeader;
