import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getMarkerWeight, getPopupAdjust } from '../../helpers/getMarkerWeight';

const getLineWeight = (zoom: number, constant = 1) => {
  if (zoom <= 7) return 0.7 * constant;
  if (zoom <= 11) return 1 * constant;
  if (zoom <= 13) return 1.2 * constant;
  if (zoom <= 14) return 1 * constant;
  if (zoom <= 16) return 1.4 * constant;
  return 1 * constant;
};

export const StyledContainer = styled(Box)<{
  zoom: number;
  editingline?: boolean;
}>`
  & .leaflet-container {
    height: 100vh;
    cursor: default !important;
  }

  & .marker {
    ${({ zoom }) => css`
      margin-top: ${getMarkerWeight(zoom)?.mt} !important;
      margin-left: ${getMarkerWeight(zoom)?.ml} !important;
      width: ${getMarkerWeight(zoom)?.width} !important;
      height: ${getMarkerWeight(zoom)?.height} !important;
    `}

    &.hovered {
      transition: filter 150ms;
      filter: saturate(1.9) drop-shadow(0 0 2px #c8faf7);
    }
  }

  & .leaflet-popup {
    ${({ zoom }) => css`
      bottom: ${getPopupAdjust(zoom, 'lg')?.bottom} !important;
      left: ${getPopupAdjust(zoom, 'lg')?.left} !important;

      @media (max-width: 520px) {
        bottom: ${getPopupAdjust(zoom, 'sm')?.bottom} !important;
        left: ${getPopupAdjust(zoom, 'sm')?.left} !important;
      }

      @media (max-width: 440px) {
        bottom: ${getPopupAdjust(zoom, 'xs')?.bottom} !important;
        left: ${getPopupAdjust(zoom, 'xs')?.left} !important;
      }
    `}
  }

  & .marker-circle {
    stroke-width: 1px;
    stroke: rgba(0, 0, 0, 0.6);
    fill: black;
  }

  & .polyline {
    ${({ zoom, editingline }) => css`
      stroke-width: ${getLineWeight(zoom)};
      stroke: #38b2ac;

      ${!editingline &&
      css`
        &:hover {
          stroke-width: ${getLineWeight(zoom, 2)};
          stroke: #4fd1c5;
        }
      `}

      &.selected {
        stroke-width: ${getLineWeight(zoom, 2)};
        stroke: #2ecc71 !important;
      }
    `}
  }

  & .leaflet-popup-content-wrapper {
    border-radius: 4px;
    padding: 0px;
  }

  & .leaflet-popup-content {
    margin: 0px;
    width: auto !important;
  }

  & .leaflet-popup-close-button {
    display: none;
  }
`;

export const StyledMarkerContainer = styled(Box)`
  position: absolute;
  z-index: 999;
  bottom: 60px;
  left: 80px;
  padding: 4px;
  display: flex;
  gap: 8px;
  color: white;
  font-size: 20px;
  height: 20px;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  user-select: none;

  & .checked {
    color: #2ecc71;
    font-size: 30px;
    margin-left: -4px;
    margin-top: -8px;
  }

  @media (max-width: 520px) {
    left: 0;
    bottom: 20px;
    padding: 32px;
    width: 100vw;
  }
`;

export const StyledCheckBox = styled(Box)`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: white;
`;
