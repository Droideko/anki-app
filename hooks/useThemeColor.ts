/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useTheme } from "@/components/CustomThemeProvide";
import { ThemeColors, ThemeTypes } from "@/src/constants/Colors";

export function useThemeColor(): ThemeTypes["colors"] {
  const { theme } = useTheme();

  return theme.colors;
}

// export function useThemeColor<T extends keyof ThemeColors>(
//   props: { light?: string; dark?: string },
//   colorName: T
// ): ThemeColors[T] | string | undefined {
//   const { theme, colorScheme } = useTheme();
//   const colorFromProps = props[colorScheme]; // TODO check if need

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return theme.colors[colorName];
//   }
// }
