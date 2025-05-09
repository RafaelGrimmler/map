import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledContainer = styled(Box)`
  width: 300px;
  min-height: 150px;
  position: absolute;
  background-color: ${({ theme }) => theme.palette.background.main};
  border-radius: 4px;
  box-shadow: 1px 0px 10px ${({ theme }) => theme.palette.divider.main};
  left: 120px;
  top: 20px;
  z-index: 9999;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
