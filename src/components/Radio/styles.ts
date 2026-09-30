import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledOption = styled(Box)`
  display: flex;
  gap: 8px;
  padding: 6px 8px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
