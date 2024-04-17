import { Image } from '../../types';
import GalleryCard from '../GalleryCard';
import {
  StyledContainer,
  StyledDateTitle,
  StyledGroupContainer,
  StyledImagesContainer,
} from './styles';
import { getGroupedImages } from '../../helpers/getGroupedImages';
import { formatDate } from '../../helpers/useDates';
import { useEffect } from 'react';

type GalleryGroupListProps = {
  images: Image[];
  viewMode: boolean;
  previousId: number;
  handleToggleExpand: (img?: Image) => void;
};

const GalleryGroupList: React.FC<GalleryGroupListProps> = ({
  images,
  viewMode,
  previousId,
  handleToggleExpand,
}) => {
  const groups = getGroupedImages(images);

  useEffect(() => {
    if (previousId)
      document?.querySelector(`.gallery-card-${previousId}`)?.scrollIntoView();
  }, []);

  return (
    <StyledContainer>
      {groups?.map((group) => {
        const formatedDate = formatDate(group?.date);

        return (
          <StyledGroupContainer key={group?.date?.getTime()}>
            <StyledDateTitle>{formatedDate}</StyledDateTitle>
            <StyledImagesContainer>
              {group?.images?.map((image) => (
                <GalleryCard
                  key={image?.id}
                  mb={4}
                  viewMode={viewMode}
                  handleClick={() => handleToggleExpand(image)}
                  image={image}
                />
              ))}
            </StyledImagesContainer>
          </StyledGroupContainer>
        );
      })}
    </StyledContainer>
  );
};

export default GalleryGroupList;
