import * as React from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  theme,
  THEME,
  THEME_KEY,
  Themes,
  ThemeTypes,
} from '@shared/constants/colors';

type Props = {
  children: React.ReactNode;
};

type Context = {
  theme: ThemeTypes;
  toggleTheme: (newTheme?: Themes) => Promise<void>;
};

const ThemeContext = React.createContext<Context | undefined>(undefined);

ThemeContext.displayName = 'ThemeContext';

export default function ThemeProvider({ children }: Props) {
  const systemTheme: Themes = useColorScheme() ?? THEME.LIGHT;
  const isDark = systemTheme === THEME.DARK;
  const [isDarkTheme, setIsDarkTheme] = React.useState(isDark);

  React.useEffect(() => {
    const getTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (savedTheme) {
          setIsDarkTheme(savedTheme === THEME.DARK);
        }
      } catch (error: unknown) {
        console.log('Error loading theme:', error);
      }
    };

    getTheme();
  }, []);

  const toggleTheme = async (newTheme?: Themes) => {
    const newIsDarkTheme = newTheme ? newTheme === THEME.DARK : !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);
    await AsyncStorage.setItem(
      THEME_KEY,
      newIsDarkTheme ? THEME.DARK : THEME.LIGHT,
    );
  };

  const currentTheme = isDarkTheme ? theme.dark : theme.light;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be wrapped in a <ThemeContext />');
  }

  return context;
}
