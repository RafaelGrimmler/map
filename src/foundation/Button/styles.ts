import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledButton = styled(Button)<{
  $contained: boolean;
  $small?: boolean;
}>`
  font-size: 12px;
  line-height: 24px;
  height: 32px;
  width: 100%;

  ${({ $contained }) =>
    $contained &&
    `
      background-color: rgb(255, 174, 0);

      &:hover {
        background-color: rgb(255, 206, 101);
      }
    `}

  ${({ $small }) =>
    $small &&
    `
      font-size: 10px;
      line-height: 20px;
      height: 24px;
    `}
`;
