/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from "@/src/shared/contexts/CustomThemeProvide";
import { ThemeTypes } from "@/src/shared/constants/scolors";

export function useThemeColor(): ThemeTypes["colors"] {
  const { theme } = useTheme();

  return theme.colors;
}
