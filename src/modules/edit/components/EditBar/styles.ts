import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content 1fr;
  border-left: 1px solid ${({ theme }) => theme.palette.divider.main};
`;
