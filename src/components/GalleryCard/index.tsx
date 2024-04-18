/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyledActionBar,
  StyledActionContainer,
  StyledContainer,
  StyledSelectBox,
  StyledSelectContainer,
  StyledSelectedBox,
  StyledViewIconWrapper,
} from './styles';
import { useEffect, useState } from 'react';
import { clickElements, stopPropagation } from '../../helpers/utils';
import GalleryPopover from '../GalleryPopover';
import { Image } from '../../types';
import { Box } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';

type GalleryCardProps = {
  image: Image;
  isSelected?: boolean;
  mb?: number;
  viewMode?: boolean;
  isView?: boolean;
  handleClick?: () => void;
  handleSelect?: (imageId: number) => void;
};

const GalleryCard: React.FC<GalleryCardProps> = ({
  image,
  isSelected,
  mb,
  viewMode,
  isView,
  handleClick,
  handleSelect,
}) => {
  return (
    <StyledContainer className={`gallery-card-${image?.id}`} mb={mb}>
      <img src={image?.src} loading="lazy" />
      {isSelected && <StyledSelectedBox />}
      <StyledActionContainer
        $isView={isView}
        className="gallery-card-action-container"
        onClick={handleClick}
      >
        <StyledActionBar>
          <StyledViewIconWrapper>
            {isView && <FaEye fontSize="24px" color="#2ecc9d" />}
          </StyledViewIconWrapper>
          {!viewMode && (
            <StyledSelectContainer
              onClick={(e) => {
                stopPropagation(e);
                handleSelect?.(image?.id);
              }}
            >
              <StyledSelectBox
                $isSelected={isSelected}
                className="select-box"
              />
            </StyledSelectContainer>
          )}
        </StyledActionBar>
      </StyledActionContainer>
    </StyledContainer>
  );
};

export default GalleryCard;
