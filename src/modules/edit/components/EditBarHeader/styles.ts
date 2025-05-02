import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledContainer = styled(Box)`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider.main};
`;
