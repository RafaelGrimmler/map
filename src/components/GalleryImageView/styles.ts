import { Box, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 20%;
    gap: 16px;
`

export const StyledImageContainer = styled(Box)`
    width: 100%;
    height: 100%;
    background-color: #171717;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 4px;
    justify-content: center;
    position: relative;
    
    &:hover .image-mask {
        display: block;
    }
`

export const StyledImage = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    user-select: none;
`

export const StyledImageMask = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
`

export const StyledImageMaskWrapper = styled(Box)`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const StyledArrowsContainer = styled(Box)`
    width: 150px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    filter: drop-shadow(0px 0px 4px black);
`

export const StyledListWrapper = styled(Box)`
    overflow: auto;

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`

export const StyledListContainer = styled(Box)`
    width: 100%;
    height: min-content;
    padding-right: 16px;
    columns: 1;
    gap: 16px;
`