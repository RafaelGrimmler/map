import { Image } from '../../types';
import GalleryCard from '../GalleryCard';
import {
  StyledContainer,
  StyledImage,
  StyledImageContainer,
  StyledListContainer,
  StyledListWrapper,
} from './styles';

type GalleryImageViewProps = {
  image: Image;
  images: Image[];
  handleToggleExpand: (img?: Image) => void;
};

const GalleryImageView: React.FC<GalleryImageViewProps> = ({
  image,
  images,
  handleToggleExpand,
}) => {
  return (
    <StyledContainer>
      <StyledImageContainer>
        <StyledImage src={image?.src} />
      </StyledImageContainer>
      <StyledListWrapper>
        <StyledListContainer>
          {images?.map((e, i) => (
            <GalleryCard
              key={e?.id}
              image={e}
              handleClick={() => handleToggleExpand(e)}
              mb={i < images?.length - 1 ? 4 : 0}
            />
          ))}
        </StyledListContainer>
      </StyledListWrapper>
    </StyledContainer>
  );
};

export default GalleryImageView;
