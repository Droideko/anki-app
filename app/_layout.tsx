import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { PaperProvider } from "react-native-paper";

import ThemeProvider, { useTheme } from "@/components/CustomThemeProvide";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Layout({ children }: any) {
  // const colorScheme = useColorScheme();
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
        <Stack>
          <Stack.Screen
            name="(auth)" // CAN USE (auth)/login without _layout.tsx in (auth)
            options={{ headerShown: false, title: "Log In" }}
          />
          <Stack.Screen name="drawer" options={{ headerShown: false }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="broken-view" options={{ headerShown: false }} />

          {/* <Stack.Screen
            name="details/[id]/options"
            options={{ headerShown: false }}
          /> */}

          <Stack.Screen name="modal" options={{ presentation: "modal" }} />

          <Stack.Screen name="+not-found" />
        </Stack>
      </Layout>
    </ThemeProvider>
  );
}
