import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import GlobalSnackbar from '@shared/components/GlobalSnackbar';
import { useLanguageStore } from '@shared/store/useLanguageStore';
import Providers from '@shared/contexts/providers';
import { useThemeColor } from '@shared/hooks/useThemeColor';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { initializeLanguage } = useLanguageStore();

  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <GestureHandlerRootView>
        <RootStack />
        <GlobalSnackbar />
      </GestureHandlerRootView>
    </Providers>
  );
}

function RootStack() {
  const { background } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: background,
        },
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="deck" options={{ headerShown: false }} />
      <Stack.Screen
        name="(wizard)"
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen
        name="review"
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
