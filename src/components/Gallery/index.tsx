import { ModalOverlay, ModalBody, Modal, Text, Box } from '@chakra-ui/react';
import {
  StyledAddButton,
  StyledIconButton,
  StyledModalContent,
  StyledModalHeader,
} from './styles';
import { IoClose } from 'react-icons/io5';
import { Image } from '../../types';
import { MdAdd } from 'react-icons/md';
import GalleryPopover from '../GalleryPopover';
import { useState } from 'react';
import { clickElements } from '../../helpers/utils';
import GalleryGroupList from '../GalleryGroupList';
import GalleryImageView from '../GalleryImageView';
import { IoMdReturnLeft } from 'react-icons/io';

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
  const [image, setImage] = useState<Image>();
  const [scrollId, setScrollId] = useState(0);

  const handleOpen = () => {
    clickElements('.gallery-form-close');
    setOpen(true);
  };

  const handleClose = () => {
    onClose();
    setImage(undefined);
  };

  console.log(image);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <StyledModalContent>
        <StyledModalHeader>
          <Box display="flex" gap={3}>
            {image?.id && (
              <StyledIconButton
                aria-label="aria-back"
                onClick={() => {
                  setScrollId(image?.id);
                  setImage(undefined);
                }}
                icon={<IoMdReturnLeft fontSize="20px" />}
              />
            )}
            <Text>Galeria</Text>
          </Box>

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
              onClick={handleClose}
              icon={<IoClose fontSize="28px" />}
            />
          </Box>
        </StyledModalHeader>
        <ModalBody pb={6} overflow="hidden">
          {image?.id ? (
            <GalleryImageView
              image={image}
              images={images}
              handleToggleExpand={(i) => setImage(i)}
            />
          ) : (
            <GalleryGroupList
              images={images}
              scrollId={scrollId}
              handleToggleExpand={(i) => setImage(i)}
            />
          )}
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default Gallery;
