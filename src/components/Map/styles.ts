import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getPolylineWeight } from './utils';

export const StyledContainer = styled(Box)<{
  zoom: number;
  disableRoutes: boolean;
  selectingRoutes: boolean;
}>`
  & .leaflet-container {
    height: 100vh;
    cursor: default !important;

    & .leaflet-control-layers,
    & .leaflet-control-attribution {
      display: none;
    }
  }

  & .polyline {
    ${({ zoom, selectingRoutes }) => css`
      stroke-width: ${getPolylineWeight(zoom)};
      stroke: rgb(255, 230, 0);
      cursor: ${selectingRoutes ? 'pointer' : 'default'};

      &:hover {
        ${selectingRoutes &&
        css`
          stroke: rgb(255, 174, 0);
          stroke-width: ${getPolylineWeight(zoom) * 1.5};
        `}
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

export const StyledCheckBox = styled(Box)`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: white;
`;
