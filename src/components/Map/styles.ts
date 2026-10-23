import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getPolylineWeight } from './utils';

export const StyledContainer = styled(Box)<{
  zoom: number;
  disableRoutes: boolean;
  selectingRoutes: boolean;
  deletingRoute: boolean;
  selectingCity: boolean;
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
    ${({ zoom, selectingRoutes, disableRoutes, deletingRoute }) => css`
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

      ${disableRoutes &&
      css`
        stroke: rgb(0, 0, 0);
      `}

      &.selected {
        stroke: ${deletingRoute ? 'rgb(255, 63, 63)' : 'rgb(255, 174, 0)'};
        stroke-width: ${getPolylineWeight(zoom) * 1.5};
      }
    `}
  }

  & .city-circle {
    pointer-events: none;
    cursor: default;
    outline-style: none !important;
    fill-opacity: 1;
    fill: rgb(255, 255, 255);
    stroke: black;

    &.editing {
      fill: rgb(255, 174, 0);
    }

    &.checked {
      fill: rgb(102, 255, 0) !important;
    }

    ${({ selectingCity }) =>
      selectingCity &&
      css`
        cursor: pointer;

        &:hover {
          fill: rgb(255, 174, 0);
        }
      `}
  }

  & .leaflet-tooltip {
    background-color: transparent;
    border: none;
    color: black;
    box-shadow: none;
    margin-top: 0px;
    font-weight: bold;
    padding: 0px;
    line-height: 16px;

    text-shadow:
      -1px -1px 0 white,
      1px -1px 0 white,
      -1px 1px 0 white,
      1px 1px 0 white;

    &::before {
      display: none;
    }
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
