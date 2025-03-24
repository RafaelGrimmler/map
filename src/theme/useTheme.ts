import { useTheme as useThemeEmotion } from '@emotion/react';
import { Theme } from './type';

export const useTheme = (): Theme => useThemeEmotion() as any;
