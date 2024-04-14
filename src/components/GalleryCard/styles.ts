import { Box, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    height: 220px;
    border-radius: 2px;
    overflow: hidden;
    background-color: rgba(0,0,0,0.16);

    & img {
        height: 220px;
        width: 100%;
        background-size: contain !important;
    }
`

export const StyledCreateContainer = styled(IconButton)`
    height: 100%;
    padding-right: 1px;
    cursor: pointer;
    border-radius: 2px;
    min-width: 100%;
`