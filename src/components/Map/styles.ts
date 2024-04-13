import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";


const getLineWeight = (zoom: number, constant = 1) => {
    if (zoom <= 7) return 0.7 * constant;
    if (zoom <= 11) return 1 * constant;
    if (zoom <= 13) return 2 * constant;
    if (zoom <= 14) return 1.2 * constant;
    if (zoom <= 16) return 0.8 * constant;
    return 1 * constant;
  };

//   const upperWeight = getLineWeight(2);
//   const defaultWeight = getLineWeight();

export const StyledContainer = styled(Box)<{
    zoom: number
    editingLine?: boolean;
}>`
    & .leaflet-container {
        height: 100vh;
        cursor: default !important;
    }

    & .marker-hovered {
        transition: filter 150ms;
        filter: saturate(1.9) drop-shadow(0 0 2px #c8faf7);
    }

    & .polyline {
        ${({ zoom, editingLine }) => css`
            stroke-width: ${getLineWeight(zoom)};
            stroke: #38B2AC;

            &.selected {
                stroke-width: ${getLineWeight(zoom, 2)};
                stroke: #2ECC71;
            }

            ${!editingLine && css`
                &:hover {
                    stroke-width: ${getLineWeight(zoom, 2)};
                    stroke: #4FD1C5;
                }
            `}
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
`

export const StyledMarkerContainer = styled(Box)`
    position: absolute;
    z-index: 99999;
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

    & .checked {
        color: #2ECC71;
        font-size: 30px;
        margin-left: -4px;
        margin-top: -8px;
    }
`

export const StyledCheckBox = styled(Box)`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: white;
`
