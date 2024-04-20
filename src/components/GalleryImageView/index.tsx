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
  selected: number[];
  viewMode?: boolean;
  handleSelect: (imageId: number) => void;
  handleToggleExpand: (img?: Image) => void;
};

const GalleryImageView: React.FC<GalleryImageViewProps> = ({
  image,
  images,
  selected,
  viewMode,
  handleSelect,
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
          {images?.length > 1 && (
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
          )}
        </StyledImageMask>
      </StyledImageContainer>
      <StyledListWrapper>
        <StyledListContainer>
          {images?.map((e, i) => (
            <GalleryCard
              key={e?.id}
              image={e}
              viewMode={viewMode}
              isSelected={selected?.some((id) => id === e?.id)}
              isView={e?.id === image?.id}
              mb={i < images?.length - 1 ? 4 : 0}
              handleClick={() => handleToggleExpand(e)}
              handleSelect={handleSelect}
            />
          ))}
        </StyledListContainer>
      </StyledListWrapper>
    </StyledContainer>
  );
};

export default GalleryImageView;
