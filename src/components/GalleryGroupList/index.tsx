import { Image } from '../../types';
import GalleryCard from '../GalleryCard';
import {
  StyledContainer,
  StyledGroupContainer,
  StyledImagesContainer,
} from './styles';
import { Text } from '@chakra-ui/react';
import { getGroupedImages } from '../../helpers/getGroupedImages';
import { formatDate } from '../../helpers/useDates';
import { useEffect } from 'react';

type GalleryGroupListProps = {
  images: Image[];
  scrollId: number;
  handleToggleExpand: (img?: Image) => void;
};

const GalleryGroupList: React.FC<GalleryGroupListProps> = ({
  images,
  scrollId,
  handleToggleExpand,
}) => {
  const groups = getGroupedImages(images);

  useEffect(() => {
    if (scrollId)
      document?.querySelector(`.gallery-card-${scrollId}`)?.scrollIntoView();
  }, []);

  return (
    <StyledContainer>
      {groups?.map((group) => {
        const formatedDate = formatDate(group?.date);

        return (
          <StyledGroupContainer key={group?.date?.getTime()}>
            <Text fontSize="22px">{formatedDate}</Text>
            <StyledImagesContainer>
              {group?.images?.map((image) => (
                <GalleryCard
                  key={image?.id}
                  mb={4}
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
