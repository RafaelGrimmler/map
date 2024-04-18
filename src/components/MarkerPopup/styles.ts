import { Box, IconButton, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    width: 320px;
    height: 250px;
    padding: 4px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`  

export const StyledIconButton = styled(IconButton)`
    width: 28px;
    min-width: 28px;
    height: 28px;
`

export const StyleImageContainer = styled(Box)`
    width: 100%;
    height: 100%;
    background-color: #171717;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

export const StyledImage = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    user-select: none;
`