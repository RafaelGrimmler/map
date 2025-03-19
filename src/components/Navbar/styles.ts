import { Avatar, Box, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledNavbarContainer = styled(Box)`
  width: 160px;
  height: auto;
  position: absolute;
  top: 60px;
  left: 90px;
  z-index: 999;

  @media (max-width: 520px) {
    top: 32px;
    left: 32px;
  }
`;

export const StyledWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const StyledHeader = styled(Box)`
  width: 100%;
  height: 60px;
  display: flex;
  background-color: red;

  @media (max-width: 520px) {
    height: 30px;
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  top: -30px;
  left: -60px;
  z-index: 9;
  position: absolute;

  @media (max-width: 520px) {
    width: 60px;
    height: 60px;
    top: -20px;
    left: -20px;
  }
`;

export const StyledNameContainer = styled(Box)`
  width: 240px;
  height: 60px;

  position: absolute;
  display: flex;
  align-items: center;
  background-color: #2ecc9d;

  padding-left: 50px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  font-size: 20px;
  line-height: 20px;
  font-weight: bold;

  @media (max-width: 520px) {
    height: 30px;
  }
`;

export const StyledActionContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledButton = styled(Button)`
  width: 160px;
  min-width: 160px;
  border-radius: 0;

  &:last-of-type {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:disabled {
    opacity: 1;
    background-color: gray !important;
  }

  @media (max-width: 520px) {
    height: 32px;
  }
`;
