/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popup } from 'react-leaflet';
import {
  StyleImageContainer,
  StyledActionsContainer,
  StyledActionsWrapper,
  StyledArrowsContainer,
  StyledContainer,
  StyledIconButton,
  StyledImage,
  StyledInfoBar,
} from './styles';
import { Box } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { Image } from '../../types';
import { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { LuExpand } from 'react-icons/lu';
import Gallery from '../Gallery';

type MarkerPopupProps = {
  images?: Image[];
  handleEdit?: () => void;
};

const MarkerPopup: React.FC<MarkerPopupProps> = ({ images, handleEdit }) => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    const closeElement = document.querySelector('.leaflet-popup-close-button');
    (closeElement as any)?.click();
  };

  useEffect(() => setIndex(0), [images]);

  const handlePrev = () => {
    if (index === 0 && images) setIndex(images?.length - 1);
    else setIndex(index - 1);
  };

  const handleNext = () => {
    if (images && index === images?.length - 1) setIndex(0);
    else setIndex(index + 1);
  };

  const handleToggleExpand = () => setOpen(!open);

  return (
    <Popup>
      <StyledContainer>
        <Box display="flex" gap={2} justifyContent="flex-end">
          <StyledIconButton
            aria-label="aria-edit"
            isDisabled={!handleEdit}
            onClick={() => handleEdit?.()}
            icon={<MdOutlineEdit fontSize="24px" />}
          />
          <StyledIconButton
            aria-label="aria-expand"
            onClick={handleToggleExpand}
            icon={<LuExpand fontSize="18px" />}
          />
          <StyledIconButton
            aria-label="aria-close"
            onClick={handleClose}
            icon={<IoClose fontSize="24px" />}
          />
        </Box>
        <StyleImageContainer>
          <StyledImage src={images?.[index]?.src} />
          <StyledActionsContainer>
            <StyledActionsWrapper className="actions-wrapper">
              <StyledArrowsContainer onClick={handlePrev}>
                {images && images?.length > 1 && (
                  <GrPrevious fontSize="32px" color="white" />
                )}
              </StyledArrowsContainer>
              <StyledArrowsContainer
                onClick={handleNext}
                justifyContent="flex-end"
              >
                {images && images?.length > 1 && (
                  <GrNext fontSize="32px" color="white" />
                )}
              </StyledArrowsContainer>
              <StyledInfoBar>
                {index + 1} / {images?.length}
              </StyledInfoBar>
            </StyledActionsWrapper>
          </StyledActionsContainer>
        </StyleImageContainer>
      </StyledContainer>

      {open && (
        <Gallery
          images={images as Image[]}
          isOpen
          onClose={handleToggleExpand}
          defaultImage={images?.[index]}
        />
      )}
    </Popup>
  );
};

export default MarkerPopup;
