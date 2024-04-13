import { Popup } from 'react-leaflet';
import { StyledContainer, StyledIconButton } from './styles';
import { Box } from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import { MdOutlineEdit } from 'react-icons/md';

type MarkerPopupProps = {
  handleEdit?: () => void;
};

const MarkerPopup: React.FC<MarkerPopupProps> = ({ handleEdit }) => {
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
      </StyledContainer>
    </Popup>
  );
};

export default MarkerPopup;
