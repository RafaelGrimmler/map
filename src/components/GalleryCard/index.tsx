/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyledActionContainer, StyledContainer } from './styles';
import { useEffect, useState } from 'react';
import { clickElements } from '../../helpers/utils';
import GalleryPopover from '../GalleryPopover';
import { Image } from '../../types';

type GalleryCardProps = {
  image: Image;
  mb?: number;
  handleClick?: () => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  mb,
  handleClick,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    clickElements('.gallery-form-close');
    setOpen(true);
  };

  return (
    <GalleryPopover handleSave={() => {}} open={open} setOpen={setOpen}>
      <StyledContainer className={`gallery-card`} mb={mb}>
        <img src={image?.src} loading="lazy" />
        <StyledActionContainer
          className="gallery-card-action-container"
          onClick={handleClick}
        />
      </StyledContainer>
    </GalleryPopover>
  );
};

export default GalleryCard;
