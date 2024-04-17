/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyledActionContainer, StyledContainer } from './styles';
import { useEffect, useState } from 'react';
import { clickElements } from '../../helpers/utils';
import GalleryPopover from '../GalleryPopover';
import { Image } from '../../types';
import { Box } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';

type GalleryCardProps = {
  image: Image;
  mb?: number;
  viewMode?: boolean;
  isView?: boolean;
  handleClick?: () => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  mb,
  viewMode,
  isView,
  handleClick,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    clickElements('.gallery-form-close');
    setOpen(true);
  };

  return (
    <GalleryPopover handleSave={() => {}} open={open} setOpen={setOpen}>
      <StyledContainer className={`gallery-card-${image?.id}`} mb={mb}>
        <img src={image?.src} loading="lazy" />
        <StyledActionContainer
          $isView={isView}
          className="gallery-card-action-container"
          onClick={handleClick}
        >
          <Box display="flex" sx={{ filter: 'drop-shadow(0px 0px 2px black)' }}>
            <Box p={1}>
              {isView && <FaEye fontSize="24px" color="#2ecc9d" />}
            </Box>
          </Box>
        </StyledActionContainer>
      </StyledContainer>
    </GalleryPopover>
  );
};

export default GalleryCard;
