import { Box, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    max-height: 300px;

    /* height: 260px;
    min-width: 140px;
    max-width: 350px; */

    border-radius: 4px;
    overflow: hidden;
    position: relative;
    background-color: rgba(0,0,0,0.16);
    display: flex;
    align-items: center;

    img {
        /* max-width: 100%; */
        /* max-height: 100%; */
        /* object-fit: cover; */
        /* object-position: bottom; */
        width: 100%;
        max-height: 100%;
        overflow: hidden;
    }

    &:hover .gallery-card-action-container {
        display: block;
    }
`

export const StyledCreateContainer = styled(IconButton)`
    height: 100%;
    padding-right: 1px;
    cursor: pointer;
    border-radius: 4px;
    min-width: 100%;
`

export const StyledActionContainer = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: rgba(0,0,0,0.24);
    cursor: pointer;
    display: none;
`
