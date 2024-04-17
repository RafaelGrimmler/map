import { Box, Text } from '@chakra-ui/react';

import { IoClose } from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import GalleryPopover from '../GalleryPopover';
import { IoMdReturnLeft } from 'react-icons/io';
import { StyledButton, StyledIconButton } from './styles';
import { Image } from '../../types';
import { useState } from 'react';
import { clickElements } from '../../helpers/utils';

type GalleryHeaderProps = {
  image: Image | undefined;
  mode?: 'VIEW' | 'EDIT' | 'SELECT';
  setImage: React.Dispatch<React.SetStateAction<Image | undefined>>;
  setPreviousId: React.Dispatch<React.SetStateAction<number>>;
  handleClose: () => void;
  handleInsertImage?: (src: string) => void;
};

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  image,
  mode,
  setImage,
  setPreviousId,
  handleClose,
  handleInsertImage,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    clickElements('.gallery-form-close');
    setOpen(true);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
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
        {mode === 'SELECT' && <StyledButton>Salvar</StyledButton>}
        {mode === 'EDIT' && (
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
        )}
        <StyledIconButton
          aria-label="aria-close"
          onClick={handleClose}
          icon={<IoClose fontSize="28px" />}
        />
      </Box>
    </Box>
  );
};

export default GalleryHeader;
