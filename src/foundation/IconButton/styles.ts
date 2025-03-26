import { IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { IconButtonColor } from '.';
import { css } from '@emotion/react';
import { Theme } from '../../theme/type';

const getColor = (color: IconButtonColor, theme: Theme) =>
  ({
    primary: {
      background: theme.palette.primary.main,
      hover: theme.palette.primary.light,
      text: theme.palette.text.primary,
    },
    neutral: {
      background: theme.palette.primary.main,
      hover: theme.palette.primary.light,
      text: theme.palette.text.primary,
    },
  })[color];

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => !['$color'].includes(prop),
})<{ $color: IconButtonColor }>`
  ${({ $color, theme }) => css`
    &.contained {
      color: ${getColor($color, theme as Theme).text};
      background-color: ${getColor($color, theme as Theme).background};

      &:hover {
        background-color: ${getColor($color, theme as Theme).hover};
      }
    }

    &.simple {
      color: ${getColor($color, theme as Theme).text};
      background-color: transparent;

      &:hover {
        background-color: ${getColor($color, theme as Theme).hover};
      }
    }
  `}
`;
