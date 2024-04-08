import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0,0,0,0.7);
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 80px;
`