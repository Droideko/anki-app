import { DarkTheme, DefaultTheme } from '@react-navigation/native';

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(124 58 237)',
      onPrimary: 'rgb(249, 250, 250)',
      primaryContainer: 'rgb(216, 184, 247)',
      onPrimaryContainer: 'rgb(71, 12, 122)',
      secondary: 'rgb(243, 245, 248)',
      onSecondary: 'rgb(16, 26, 43)',
      secondaryContainer: 'rgb(230, 233, 240)',
      onSecondaryContainer: 'rgb(33, 24, 42)',
      tertiary: 'rgb(234, 89, 61)',
      onTertiary: 'rgb(249, 250, 250)',
      tertiaryContainer: 'rgb(242, 163, 150)',
      onTertiaryContainer: 'rgb(50, 16, 23)',
      success: 'rgb(34, 197, 94)', // Зеленый цвет для успеха
      onSuccess: 'rgb(255, 255, 255)', // Белый цвет текста на зеленом фоне
      error: 'rgb(245, 49, 60)',
      onError: 'rgb(249, 250, 250)',
      errorContainer: 'rgb(252, 195, 199)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(255, 255, 255)',
      onBackground: 'rgb(5, 7, 19)',
      secondaryBackground: 'rgb(249, 250, 250)',
      foreground: 'rgb(224, 182, 10)',
      surface: 'rgb(255, 255, 255)',
      onSurface: 'rgb(5, 7, 19)',
      surfaceVariant: 'rgb(243, 245, 248)',
      onSurfaceVariant: 'rgb(105, 109, 117)',
      outline: 'rgb(231, 233, 238)',
      outlineVariant: 'rgb(220, 220, 225)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgba(0, 0, 0, 0.5)',
      inverseSurface: 'rgb(5, 7, 19)',
      inverseOnSurface: 'rgb(255, 255, 255)',
      inversePrimary: 'rgb(109, 38, 227)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(248, 248, 250)',
        level2: 'rgb(243, 243, 246)',
        level3: 'rgb(238, 238, 242)',
        level4: 'rgb(233, 233, 238)',
        level5: 'rgb(228, 228, 234)',
      },
      surfaceDisabled: 'rgba(5, 7, 19, 0.12)',
      onSurfaceDisabled: 'rgba(5, 7, 19, 0.38)',
      backdrop: 'rgba(51, 47, 55, 0.4)',
      tint: 'rgb(162, 54, 241)',
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      card: 'rgb(3, 7, 18)',
      text: 'rgb(249, 250, 250)',
      border: 'rgb(31, 41, 52)',
      notification: 'rgb(245, 49, 60)',
      primary: 'rgb(109, 38, 227)',
      onPrimary: 'rgb(249, 250, 250)',
      primaryContainer: 'rgb(78, 28, 163)',
      onPrimaryContainer: 'rgb(220, 184, 255)',
      secondary: 'rgb(31, 41, 52)',
      onSecondary: 'rgb(249, 250, 250)',
      secondaryContainer: 'rgb(46, 56, 70)',
      onSecondaryContainer: 'rgb(208, 193, 218)',
      tertiary: 'rgb(38, 102, 217)',
      onTertiary: 'rgb(249, 250, 250)',
      tertiaryContainer: 'rgb(58, 122, 237)',
      onTertiaryContainer: 'rgb(243, 183, 190)',
      success: 'rgb(22, 163, 74)', // Темно-зеленый для лучшего контраста
      onSuccess: 'rgb(255, 255, 255)', // Белый цвет текста на темно-зеленом фоне
      error: 'rgb(157, 29, 42)',
      onError: 'rgb(249, 250, 250)',
      errorContainer: 'rgb(177, 49, 62)',
      onErrorContainer: 'rgb(255, 180, 171)',
      background: 'rgb(9, 9, 11)',
      onBackground: 'rgb(249, 250, 250)',
      secondaryBackground: 'rgb(3, 4, 18)',
      foreground: 'rgb(210, 51, 250)',
      surface: 'rgb(5, 7, 19)',
      onSurface: 'rgb(249, 250, 250)',
      surfaceVariant: 'rgb(31, 41, 52)',
      onSurfaceVariant: 'rgb(151, 158, 164)',
      outline: 'rgb(31, 41, 52)',
      outlineVariant: 'rgb(51, 61, 72)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgba(0, 0, 0, 0.5)',
      inverseSurface: 'rgb(249, 250, 250)',
      inverseOnSurface: 'rgb(5, 7, 19)',
      inversePrimary: 'rgb(162, 54, 241)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(15, 17, 29)',
        level2: 'rgb(20, 22, 34)',
        level3: 'rgb(25, 27, 39)',
        level4: 'rgb(30, 32, 44)',
        level5: 'rgb(35, 37, 49)',
      },
      surfaceDisabled: 'rgba(249, 250, 250, 0.12)',
      onSurfaceDisabled: 'rgba(249, 250, 250, 0.38)',
      backdrop: 'rgba(51, 47, 55, 0.4)',
      tint: 'rgb(109, 38, 227)',
    },
  },
} as const;

export type ThemeKeys = keyof typeof theme;
export type ThemeTypes = (typeof theme)['dark'] | (typeof theme)['light'];
export type ThemeColors = ThemeTypes['colors'];

export const THEME_KEY = 'app_theme';

export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type Themes = (typeof THEME)[keyof typeof THEME];
