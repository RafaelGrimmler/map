import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const getLineWeight = (zoom: number, constant = 1) => {
  if (zoom <= 9) return 0.8 * constant;
  if (zoom <= 13) return 1.3 * constant;
  if (zoom <= 14) return 1.8 * constant;
  if (zoom <= 16) return 1.4 * constant;
  return 1 * constant;
};

export const StyledContainer = styled(Box)<{
  zoom: number;
  disableRoutes: boolean;
}>`
  & .leaflet-container {
    height: 100vh;
    cursor: default !important;
  }

  & .polyline {
    ${({ zoom, disableRoutes }) => css`
      stroke-width: ${getLineWeight(zoom)};
      stroke: ${disableRoutes ? '#8a8a8a' : '#003366'};
      cursor: ${disableRoutes ? 'default' : 'pointer'};

      /* ${!css`
        &:hover {
          stroke-width: ${getLineWeight(zoom, 2)};
          stroke: #4fd1c5;
        }
      `}

      &.selected {
        stroke-width: ${getLineWeight(zoom, 2)};
        stroke: #2ecc71 !important;
      } */
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

export const StyledCheckBox = styled(Box)`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: white;
`;
