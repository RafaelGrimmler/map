import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    & .leaflet-container {
        height: 100vh;
        cursor: default !important;
    }

    & .marker-hovered {
        filter: saturate(1.9);
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
