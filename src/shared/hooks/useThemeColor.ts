/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { ThemeTypes } from '@shared/constants/colors';
import { useTheme } from '@shared/contexts/CustomThemeProvide';

export function useThemeColor(): ThemeTypes['colors'] {
  const { theme } = useTheme();

  return theme.colors;
}
