/* eslint-disable @typescript-eslint/no-unused-vars */
import { Popup } from 'react-leaflet';
import {
  StyleImageContainer,
  StyledContainer,
  StyledIconButton,
  StyledImage,
} from './styles';
import { Box } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';
import { Image } from '../../types';
import { useState } from 'react';

type MarkerPopupProps = {
  images?: Image[];
  handleEdit?: () => void;
};

const MarkerPopup: React.FC<MarkerPopupProps> = ({ images, handleEdit }) => {
  const [selected, setSelected] = useState<Image | undefined>(images?.[0]);

  const handleClose = () => {
    const closeElement = document.querySelector('.leaflet-popup-close-button');
    (closeElement as any)?.click();
  };

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
            aria-label="aria-close"
            onClick={handleClose}
            icon={<IoClose fontSize="24px" />}
          />
        </Box>
        <StyleImageContainer>
          <StyledImage src={selected?.src} />
        </StyleImageContainer>
      </StyledContainer>
    </Popup>
  );
};

export default MarkerPopup;
