import { Box, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    max-height: 300px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    background-color: rgba(0,0,0,0.16);
    display: flex;
    align-items: center;

    img {
        width: 100%;
        max-height: 100%;
        overflow: hidden;
        user-select: none;
    }

    &:hover .gallery-card-action-container {
        display: block;

        & .select-box {
            display: block;
        }
    }
`

export const StyledCreateContainer = styled(IconButton)`
    height: 100%;
    padding-right: 1px;
    cursor: pointer;
    border-radius: 4px;
    min-width: 100%;
`

export const StyledActionContainer = styled(Box)<{ $isView?: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: rgba(0,0,0,0.24);
    padding: 12px;
    cursor: pointer;

    display: ${({ $isView }) => $isView ? 'block' : 'none'};
`

export const StyledViewIconWrapper = styled(Box)`
    padding: 4px;
    filter: drop-shadow(0px 0px 2px black);
`

export const StyledSelectContainer = styled(Box)`
    padding: 4px 4px 4px 12px;
`

export const StyledSelectBox = styled(Box)<{ $isSelected?: boolean }>`
    width: 20px;
    height: 20px;
    border: 4px solid ${({ $isSelected }) => $isSelected ? '#2ecc9d' : '#c7c6c5'};
    background-color: ${({ $isSelected }) => $isSelected ? '#b8f2d1' : 'white'};
    border-radius: 50%;
    display: none;
`

export const StyledActionBar = styled(Box)`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const StyledSelectedBox = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: 6px solid #2ecc9d;
`