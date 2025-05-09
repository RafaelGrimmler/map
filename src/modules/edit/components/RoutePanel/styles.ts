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

export const StyledRoute = styled(Box, {
  shouldForwardProp: (prop) => !['$selected'].includes(prop),
})<{ $selected: boolean }>`
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.palette.primary.main : theme.palette.divider.main};
  background-color: ${({ $selected, theme }) =>
    $selected ? theme.palette.primary.light : theme.palette.background.main};
`;

export const StyledLoadingContainer = styled(Box)`
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.light};
`;
