import styled from '@emotion/styled';
import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';
import { Avatar } from '@chakra-ui/react';

export const StyledProfileContainer = styled(Box)`
  width: 600px;
  height: 400px;
  position: relative;
  border-radius: 4px;

  & .leaflet-container {
    width: 600px !important;
    height: 400px !important;
    border-radius: 4px;
  }

  & .leaflet-bottom {
    display: none;
  }

  @media (max-width: 1500px) {
    width: 300px;
    height: 300px;

    & .leaflet-container {
      width: 300px !important;
      height: 300px !important;
    }
  }

  @media (max-width: 1150px) {
    width: 300px;
    height: 100px;

    & .leaflet-container {
      display: none;
    }
  }
`;

export const StyledProfileOverlay = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const StyledOverlayWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
`;

export const StyledProfileContent = styled(Box)`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-end;
  transition: 150ms;
`;

export const StyledAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin-left: -28px;
  transform: translateY(5px);
`;

export const StyledProfileInformations = styled(Box)`
  width: 600px;
  height: 60%;
  padding-left: 80px;
  margin-left: -72px;
  background-color: ${({ theme }) => theme.palette.primary.light};
  display: flex;
  transition: 150ms;
  flex-direction: column;
  padding-bottom: 4px;
  gap: 2px;
  overflow: hidden;
  justify-content: center;
`;

export const StyledName = styled(Text)`
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
`;

export const StyledVehicle = styled(Text)`
  font-size: 16px;
  line-height: 16px;
`;
