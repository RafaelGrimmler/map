import { ModalOverlay, ModalBody, Modal, Text } from '@chakra-ui/react';
import {
  StyledIconButton,
  StyledModalContent,
  StyledModalHeader,
} from './styles';
import { IoClose } from 'react-icons/io5';
import GalleryList from '../GalleryList';
import { Image } from '../../types';

type GalleryProps = {
  isOpen: boolean;
  images: Image[];
  onClose: () => void;
};

const Gallery: React.FC<GalleryProps> = ({ isOpen, images, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <StyledModalContent>
        <StyledModalHeader>
          <Text>Galeria</Text>
          <StyledIconButton
            aria-label="aria-close"
            onClick={onClose}
            icon={<IoClose fontSize="28px" />}
          />
        </StyledModalHeader>
        <ModalBody pb={6} overflow="hidden">
          <GalleryList images={images} />
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default Gallery;
