import { Avatar, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const StyledNavbarContainer = styled(Box)`
  width: 100px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -3px;
  z-index: 999;
  background-color: ${({ theme }) => theme.palette.background.main};
  border-left: 1px solid ${({ theme }) => theme.palette.divider.main};
  box-shadow: 2px 1px 10px ${({ theme }) => theme.palette.divider.main};

  @media (max-width: 520px) {
    top: 32px;
    left: 32px;
  }
`;

export const StyledWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 8px;
`;

export const StyledAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;

  & img {
    border-radius: 8px;
  }
`;

export const StyledOverlay = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
`;
