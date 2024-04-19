import { Box, IconButton, Image } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    width: 500px;
    height: 360px;
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
    position: relative;
`

export const StyledImage = styled(Image)`
    max-width: 100%;
    max-height: 100%;
    user-select: none;
`

export const StyledActionsContainer = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    &:hover .actions-wrapper{
        display: flex;
    }
`

export const StyledActionsWrapper = styled(Box)`
    width: 100%;
    height: 100%;
    position: relative;
    display: none;
`

export const StyledArrowsContainer = styled(Box)`
    width: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    filter: drop-shadow(0px 0px 4px black);
`

export const StyledInfoBar = styled(Box)`
    width: 100%;
    height: 30px;
    background-color: rgba(0,0,0,0.4);
    top: 0;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
`

export const StyledEmptyContainer = styled(Box)`
    color: white;
    font-size: 30px;
    width: 60%;
    display: flex;
    align-items: center;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    text-align: center;
`