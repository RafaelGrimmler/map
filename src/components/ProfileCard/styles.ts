import { Avatar, Box, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const StyledProfileContainer = styled(Box)`
    width: 400px;
    height: 400px;
    position: relative;
    border-radius: 4px;

    & .leaflet-container {
        width: 400px;
        height: 400px;
    }

    & .leaflet-bottom {
        display: none;
    }

    &:hover .profile-content {
        filter: saturate(1.5) opacity(0.9);
    }

    &:hover .profile-informations {
        background-color: #b8f2d1;
    }
`

export const StyledProfileOverlay = styled(Box)`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    cursor: pointer;
`

export const StyledOverlayWrapper = styled(Box)`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: flex-end;
`

export const StyledProfileContent = styled(Box)`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: flex-end;
    transition: 150ms;
`

export const StyledAvatar = styled(Avatar)`
    width: 100px;
    height: 100px;
    margin-left: -28px;
    transform: translateY(5px);
`

export const StyledProfileInformations = styled(Box)`
    width: 400px;
    height: 60%;
    padding-left: 80px;
    margin-left: -72px;
    background-color: #2ecc9d;
    display: flex;
    transition: 150ms;
    flex-direction: column;
    padding-bottom: 4px;
    gap: 2px;
    overflow: hidden;
    justify-content: center;
`

export const StyledName = styled(Text)`
    font-weight: bold;
    font-size: 20px;
    line-height: 20px;
`

export const StyledVehicle = styled(Text)`
    font-size: 16px;
    line-height: 16px;
`