import styled from '@emotion/styled';
import Box from '../../../../foundation/Box';

export const StyledContainer = styled(Box)`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 350px;
  background-color: red;
  z-index: 999;
  background-color: rgb(250, 250, 250);
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledHeader = styled(Box)`
  display: flex;
  padding: 16px;
  gap: 12px;
  padding-bottom: 0px;

  & > img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const StyledHeaderTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  & #header-user-name {
    font-size: 18px;
    line-height: 24px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & #youtube-link svg {
    fill: red !important;
  }

  & #header-vehicle-name {
    font-size: 12px;
    line-height: 18px;
    color: rgb(131, 131, 131);
  }
`;
