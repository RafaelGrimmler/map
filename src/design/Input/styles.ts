import { Input } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledInput = styled(Input)`
    box-shadow: unset !important;
    
    &:focus-visible {
        border: 2px solid #2ECC71 !important;
    }
`