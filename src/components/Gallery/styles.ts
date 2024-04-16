import { Button, IconButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledModalContent = styled(ModalContent)`
    max-width: none;
    margin: auto;
    height: 94vh;
    width: 82vw;
    max-width: 1574px;
    min-height: 862px;
` 

export const StyledModalHeader = styled(ModalHeader)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const StyledIconButton = styled(IconButton)`
    width: 32px;
    min-width: 32px;
    height: 32px;
`

export const StyledAddButton = styled(Button)`
    height: 32px;
    background-color: #2ecc9d;

    &:hover {
        background-color: #b8f2d1;
    }
`