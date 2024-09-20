import { Suspense, useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";
import { getLocales } from "expo-localization";

import ThemeProvider, { useTheme } from "@/components/CustomThemeProvide";
import { useThemeColor } from "@/hooks/useThemeColor";
import { i18n, useLanguageStore } from "@/store/languageStore";

import { Text } from "react-native";
import { SQLiteProvider } from "@/contexts/SQLiteProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Stacks() {
  const { background } = useThemeColor();

  return (
    <Stack>
      <Stack.Screen
        name="(auth)"
        options={{ headerShown: false, title: "Log In" }}
      />
      <Stack.Screen name="drawer" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="broken-view" options={{ headerShown: false }} />
      {/* <Stack.Screen name="decks" options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerStyle: {
            backgroundColor: background, // Цвет фона заголовка
          },
          headerTintColor: "#fff", // Цвет текста заголовка
          headerTitleStyle: {
            fontWeight: "bold", // Стиль текста заголовка
          },
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

function Layout({ children }: any) {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      {/* <ThemeProvider value={theme}> {нужен импорт с @react-navigation/native для настраивание темы по дефолту} */}
      <SafeAreaProvider>{children}</SafeAreaProvider>
      {/* </ThemeProvider> */}
    </PaperProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { initializeLanguage } = useLanguageStore();

  useEffect(() => {
    initializeLanguage();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <Layout>
        <SQLiteProvider>
          <Stacks />
        </SQLiteProvider>
      </Layout>
    </ThemeProvider>
  );
}

