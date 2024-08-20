import * as React from "react";

import { useColorScheme } from "react-native";
// import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  theme,
  THEME,
  THEME_KEY,
  Themes,
  ThemeTypes,
} from "@/constants/Colors";

type Props = {
  children: React.ReactNode;
};

type Context = {
  theme: ThemeTypes;
  toggleTheme: Awaited<(newTheme?: Themes) => void>;
  colorScheme: Themes;
};

const ThemeContext = React.createContext<Context>({} as Context);

ThemeContext.displayName = "ThemeContext";

export default function ThemeProvider({ children }: Props) {
  const systemTheme: Themes = useColorScheme() ?? THEME.LIGHT;
  const isDark = systemTheme === THEME.DARK;
  const [isDarkTheme, setIsDarkTheme] = React.useState(isDark);

  React.useEffect(() => {
    // Load saved theme from storage
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
          setIsDarkTheme(savedTheme === THEME.DARK);
          // setTheme(savedTheme);
        }
      } catch (error) {
        console.log("Error loading theme:", error);
      }
    };

    getTheme();
  }, []);

  // React.useEffect(() => {
  //   // set theme to system selected theme
  //   if (colorScheme) {
  //     setTheme(colorScheme);
  //   }
  // }, [colorScheme]);

  const toggleTheme = async (newTheme?: Themes) => {
    const newIsDarkTheme = newTheme ? newTheme === THEME.DARK : !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);
    await AsyncStorage.setItem(
      THEME_KEY,
      newIsDarkTheme ? THEME.DARK : THEME.LIGHT
    );
  };

  const currentTheme = isDarkTheme ? theme.dark : theme.light;
  const colorScheme = isDarkTheme ? THEME.DARK : THEME.LIGHT;

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, toggleTheme, colorScheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeContext must be used within the ThemeContext");
  }

  return context;
}

// export const useTheme = () => React.useContext(ThemeContext);
