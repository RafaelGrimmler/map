import { Image } from '../../types';
import GalleryCard from '../GalleryCard';
import { StyledContainer } from './styles';

type GalleryListProps = {
  images: Image[];
};

const GalleryList: React.FC<GalleryListProps> = ({ images }) => {
  return (
    <StyledContainer>
      <GalleryCard isCreate />
      {images?.map((image) => <GalleryCard key={image?.id} />)}
    </StyledContainer>
  );
};

export default GalleryList;
