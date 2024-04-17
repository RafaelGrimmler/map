import { Image } from '../../types';
import GalleryCard from '../GalleryCard';
import { GrNext, GrPrevious } from 'react-icons/gr';
import {
  StyledArrowsContainer,
  StyledContainer,
  StyledImage,
  StyledImageContainer,
  StyledImageMask,
  StyledImageMaskWrapper,
  StyledListContainer,
  StyledListWrapper,
} from './styles';
import { useEffect } from 'react';

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
  const getSelectedIndex = () => images?.findIndex((e) => e?.id === image?.id);

  const handlePrev = () => {
    const index = getSelectedIndex();
    if (index > 0) handleToggleExpand(images?.[index - 1]);
    else handleToggleExpand(images?.[images?.length - 1]);
  };

  const handleNext = () => {
    const index = getSelectedIndex();
    if (index < images?.length - 1) handleToggleExpand(images?.[index + 1]);
    else handleToggleExpand(images?.[0]);
  };

  useEffect(() => {
    document
      ?.querySelector(`.gallery-card-${image?.id}`)
      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [image]);

  return (
    <StyledContainer>
      <StyledImageContainer>
        <StyledImage src={image?.src} />
        <StyledImageMask className="image-mask">
          <StyledImageMaskWrapper>
            <StyledArrowsContainer pl={3} onClick={handlePrev}>
              <GrPrevious fontSize="32px" color="white" />
            </StyledArrowsContainer>
            <StyledArrowsContainer
              pr={3}
              onClick={handleNext}
              justifyContent="end"
            >
              <GrNext fontSize="32px" color="white" />
            </StyledArrowsContainer>
          </StyledImageMaskWrapper>
        </StyledImageMask>
      </StyledImageContainer>
      <StyledListWrapper>
        <StyledListContainer>
          {images?.map((e, i) => (
            <GalleryCard
              key={e?.id}
              image={e}
              isView={e?.id === image?.id}
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
