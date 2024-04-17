/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModalOverlay, ModalBody, Modal, ModalHeader } from '@chakra-ui/react';
import { StyledModalContent } from './styles';
import { Image } from '../../types';
import { useState } from 'react';
import GalleryGroupList from '../GalleryGroupList';
import GalleryImageView from '../GalleryImageView';
import GalleryHeader from '../GalleryHeader';

type GalleryProps = {
  isOpen: boolean;
  images: Image[];
  defaultSelect?: string[];
  mode?: 'VIEW' | 'EDIT' | 'SELECT';
  onClose: () => void;
  handleInsertImage?: (src: string) => void;
};

const Gallery: React.FC<GalleryProps> = ({
  isOpen,
  images,
  mode,
  defaultSelect = [],
  onClose,
  handleInsertImage,
}) => {
  const [selected, setSelected] = useState<string[]>(defaultSelect);
  const [image, setImage] = useState<Image>();
  const [previousId, setPreviousId] = useState(0);

  const handleClose = () => {
    onClose();
    setImage(undefined);
    setPreviousId(0);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <StyledModalContent>
        <ModalHeader>
          <GalleryHeader
            mode={mode}
            image={image}
            handleClose={handleClose}
            handleInsertImage={handleInsertImage}
            setImage={setImage}
            setPreviousId={setPreviousId}
          />
        </ModalHeader>
        <ModalBody pb={6} overflow="hidden">
          {image?.id ? (
            <GalleryImageView
              image={image}
              images={images}
              handleToggleExpand={(i) => setImage(i)}
            />
          ) : (
            <GalleryGroupList
              viewMode={mode === 'VIEW'}
              images={images}
              previousId={previousId}
              handleToggleExpand={(i) => setImage(i)}
            />
          )}
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default Gallery;
