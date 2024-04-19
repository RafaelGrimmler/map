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
  mode?: 'VIEW' | 'EDIT' | 'SELECT';
  defaultSelect?: number[];
  defaultImage?: Image;
  onClose: () => void;
  handleInsertImage?: (src: string) => void;
  handleSave?: (ids: number[]) => void;
};

const Gallery: React.FC<GalleryProps> = ({
  isOpen,
  images,
  mode = 'VIEW',
  defaultSelect = [],
  defaultImage,
  onClose,
  handleInsertImage,
  handleSave,
}) => {
  const [selected, setSelected] = useState<number[]>(defaultSelect);
  const [image, setImage] = useState<Image | undefined>(defaultImage);
  const [previousId, setPreviousId] = useState(0);

  const handleClose = () => {
    onClose();
    setImage(undefined);
    setPreviousId(0);
  };

  const handleSelect = (imageId: number) => {
    const alreadyExists = selected?.some((id) => id === imageId);
    if (alreadyExists) setSelected(selected?.filter((id) => id !== imageId));
    else setSelected([...selected, imageId]);
  };

  const onSave = () => {
    handleSave?.(selected);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <StyledModalContent>
        <ModalHeader>
          <GalleryHeader
            mode={mode}
            selectedLength={selected?.length}
            image={image}
            setPreviousId={setPreviousId}
            setImage={setImage}
            handleClose={handleClose}
            handleInsertImage={handleInsertImage}
            handleSave={onSave}
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
              selected={selected}
              previousId={previousId}
              handleSelect={handleSelect}
              handleToggleExpand={(i) => setImage(i)}
            />
          )}
        </ModalBody>
      </StyledModalContent>
    </Modal>
  );
};

export default Gallery;
