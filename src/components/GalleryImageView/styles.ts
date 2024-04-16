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
    background-color: #3b3b3d;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 4px;
    justify-content: center;
`

export const StyledImage = styled(Image)`
    max-width: 100%;
    max-height: 100%;
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