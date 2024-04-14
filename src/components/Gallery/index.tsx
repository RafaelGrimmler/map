import { ModalOverlay, ModalBody, Modal, Text, Box } from '@chakra-ui/react';
import {
  StyledAddButton,
  StyledIconButton,
  StyledModalContent,
  StyledModalHeader,
} from './styles';
import { IoClose } from 'react-icons/io5';
import GalleryList from '../GalleryList';
import { Image } from '../../types';
import { MdAdd } from 'react-icons/md';
import GalleryPopover from '../GalleryPopover';
import { useState } from 'react';
import { clickElements } from '../../helpers/utils';

type GalleryProps = {
  isOpen: boolean;
  images: Image[];
  onClose: () => void;
  handleInsertImage?: (src: string) => void;
};

const Gallery: React.FC<GalleryProps> = ({
  isOpen,
  images,
  onClose,
  handleInsertImage,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    clickElements('.gallery-form-close');
    setOpen(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <StyledModalContent>
        <StyledModalHeader>
          <Text>Galeria</Text>
          <Box display="flex" gap={2}>
            <GalleryPopover
              open={open}
              setOpen={setOpen}
              handleSave={(t: string) => handleInsertImage?.(t)}
            >
              <StyledAddButton
                iconSpacing={1}
                onClick={handleOpen}
                rightIcon={<MdAdd fontSize="20px" />}
              >
                Adicionar
              </StyledAddButton>
            </GalleryPopover>
            <StyledIconButton
              aria-label="aria-close"
              onClick={onClose}
              icon={<IoClose fontSize="28px" />}
            />
          </Box>
        </StyledModalHeader>
        <ModalBody pb={6} overflow="hidden">
          <GalleryList images={images} />
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default Gallery;
