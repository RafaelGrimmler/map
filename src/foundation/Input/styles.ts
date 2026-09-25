import { Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Text from '../Text';

export const StyledInput = styled(Input)`
  box-shadow: unset !important;
  padding: 0px 8px;
  height: 32px;
  font-size: 14px;

  &:focus-visible {
    border: 1px solid rgb(255, 174, 0) !important;
  }
`;

export const StyledErrorText = styled(Text)`
  color: rgb(255, 72, 72);
  padding-top: 4px;
  font-size: 10px;
  line-height: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;

  & svg {
    font-size: 12px;
  }
`;
