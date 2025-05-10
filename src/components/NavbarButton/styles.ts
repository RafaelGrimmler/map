import styled from '@emotion/styled';
import Box from '../../foundation/Box';

export const StyledContainer = styled(Box)`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  gap: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }

  & svg,
  & p {
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  & svg {
    font-size: 20px;
  }
`;
