import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { getMarkerWeight, getPopupAdjust } from "../../helpers/getMarkerWeight";


const getLineWeight = (zoom: number, constant = 1) => {
    if (zoom <= 7) return 0.7 * constant;
    if (zoom <= 11) return 1 * constant;
    if (zoom <= 13) return 1.2 * constant;
    if (zoom <= 14) return 1 * constant;
    if (zoom <= 16) return 1.4 * constant;
    return 1 * constant;
};

export const StyledContainer = styled(Box)<{
    zoom: number
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
            bottom: ${getPopupAdjust(zoom)?.bottom} !important;
            left: ${getPopupAdjust(zoom)?.left} !important;
        `}
    }

    & .marker-circle {
        /* ${({ zoom }) => zoom === 11 && "stroke-width: 40px;"}
        ${({ zoom }) => zoom === 12 && "stroke-width: 80px;"}
        ${({ zoom }) => zoom === 13 && "stroke-width: 160px;"} */
        /* stroke-width: 80px; 12 */
        /* stroke-width: 160px; 13 */
        /* stroke-width: 320px; 14 */
        stroke-width: 1px;
        stroke: rgba(0,0,0,0.6);
        fill: black;
    }

    & .polyline {
        ${({ zoom, editingline }) => css`
            stroke-width: ${getLineWeight(zoom)};
            stroke: #38B2AC;

            ${!editingline && css`
                &:hover {
                    stroke-width: ${getLineWeight(zoom, 2)};
                    stroke: #4FD1C5;
                }
            `}

            &.selected {
                stroke-width: ${getLineWeight(zoom, 2)};
                stroke: #2ECC71 !important;
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
`

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
