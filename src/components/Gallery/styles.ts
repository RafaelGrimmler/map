import { Button, IconButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledModalContent = styled(ModalContent)`
    max-width: none;
    height: 720px;
    width: 1200px;
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