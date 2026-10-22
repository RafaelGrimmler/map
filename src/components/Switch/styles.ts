import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledContainer = styled(Box)<{ $checked: boolean }>`
  display: flex;
  width: 24px;
  height: 14px;
  background-color: ${({ $checked }) =>
    $checked ? 'rgb(255, 174, 0)' : 'rgb(185, 185, 185)'};
  padding: 2px;
  border-radius: 8px;
  justify-content: ${({ $checked }) => ($checked ? 'flex-end' : 'flex-start')};
  cursor: pointer;

  & .indicator {
    width: 10px;
    height: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
  }
`;
