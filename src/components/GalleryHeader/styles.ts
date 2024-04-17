import { Button, IconButton } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledIconButton = styled(IconButton)`
    width: 32px;
    min-width: 32px;
    height: 32px;
`

export const StyledButton = styled(Button)`
    height: 32px;
    background-color: #2ecc9d;

    &:hover {
        background-color: #b8f2d1;
    }
`