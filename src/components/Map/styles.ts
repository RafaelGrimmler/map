import { Box } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledContainer = styled(Box)`
    & .leaflet-container {
        height: 100vh;
        cursor: default;
    }
`