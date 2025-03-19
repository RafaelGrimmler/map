import { Box, Button, IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .chakra-popover__popper {
    z-index: 999 !important;
  }
`;

export const StyledIconButton = styled(IconButton)`
  width: 32px;
  min-width: 32px;
  height: 32px;
`;

export const StyledButton = styled(Button)`
  height: 32px;
  background-color: #2ecc9d;

  &:hover {
    background-color: #b8f2d1;
  }
`;
