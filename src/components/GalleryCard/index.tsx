import { StyledContainer } from './styles';
import { useState } from 'react';
import { clickElements } from '../../helpers/utils';
import GalleryPopover from '../GalleryPopover';
import { Image as ImageComponent } from '@chakra-ui/react';
import { Image } from '../../types';

type GalleryCardProps = {
  image: Image;
  handleClick?: () => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({ image, handleClick }) => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOpen = () => {
    clickElements('.gallery-form-close');
    setOpen(true);
  };

  return (
    <GalleryPopover handleSave={() => {}} open={open} setOpen={setOpen}>
      <StyledContainer>
        <ImageComponent src={image?.src} />
      </StyledContainer>
    </GalleryPopover>
  );
};

export default GalleryCard;
