import { IconButton, IconButtonProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { IconButtonColor } from '.';
import { css, Theme } from '@emotion/react';

type SizeType = { boxSize: string; iconSize: string };

const getColor = (color: IconButtonColor, theme: Theme) =>
  ({
    primary: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      text: theme.palette.text.primary,
    },
    neutral: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      text: theme.palette.text.primary,
    },
    red: {
      main: theme.palette.decorative.red.main,
      light: theme.palette.decorative.red.light,
      text: theme.palette.text.primary,
    },
  })[color];

const getSize = (size: any): SizeType => {
  const sizes: any = {
    xs: { boxSize: '24px', iconSize: '16px' },
    sm: { boxSize: '28px', iconSize: '20px' },
    md: { boxSize: '32px', iconSize: '24px' },
    lg: { boxSize: '36px', iconSize: '28px' },
  };
  return sizes?.[size];
};

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => !['$color', '$size'].includes(prop),
})<{ $color: IconButtonColor; $size: IconButtonProps['size'] }>`
  ${({ $color, $size, theme }) => css`
    min-width: 0px;
    width: ${getSize($size)?.boxSize} !important;
    height: ${getSize($size)?.boxSize} !important;

    & svg {
      font-size: ${getSize($size)?.iconSize};
    }

    &.contained {
      color: ${getColor($color, theme).text};
      background-color: ${getColor($color, theme).light};

      &:hover {
        background-color: ${getColor($color, theme).main};
      }
    }

    &.simple {
      color: ${getColor($color, theme).text};
      background-color: transparent;

      &:hover {
        background-color: ${getColor($color, theme).light};
      }
    }
  `}
`;
