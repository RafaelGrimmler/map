import { Image } from '../../types';
import GalleryCard from '../GalleryCard';
import { StyledContainer } from './styles';

type GalleryListProps = {
  images: Image[];
};

const GalleryList: React.FC<GalleryListProps> = ({ images }) => {
  return (
    <StyledContainer>
      {images?.map((image) => <GalleryCard key={image?.id} image={image} />)}
    </StyledContainer>
  );
};

export default GalleryList;
