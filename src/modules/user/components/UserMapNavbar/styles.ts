import styled from '@emotion/styled';
import Box from '../../../../foundation/Box';
import Text from '../../../../foundation/Text';

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
  gap: 8px;
`;

export const StyledHeader = styled(Box)`
  display: flex;
  padding: 16px;
  gap: 12px;
  padding-bottom: 8px;

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

export const StyledActionsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledActionOption = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  line-height: 18px;
  color: rgb(71, 71, 71);

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const StyledActionLoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 16px;
`;

export const StyledActionTitle = styled(Text)<{ $clickable: boolean }>`
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;

  ${({ $clickable }) =>
    $clickable &&
    `
    color: rgb(255, 174, 0);
    cursor: pointer;
  `}
`;

export const StyledActionRoutesContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledActionRouteSection = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
`;
