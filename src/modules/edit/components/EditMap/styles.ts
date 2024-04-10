import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 350px calc(100vw - 350px);
`