import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Portal } from 'react-native-paper';

import GlobalSnackbar from '@shared/components/GlobalSnackbar';
import { useLanguageStore } from '@shared/store/useLanguageStore';
import Providers from '@shared/contexts/providers';
import { useThemeColor } from '@shared/hooks/useThemeColor';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// SplashScreen.setOptions({
//   duration: 3000,
//   fade: true,
// });

export default function RootLayout() {
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com", // Ваш iOS Client ID
  //     webClientId: "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com", // Ваш Web Client ID
  //     offlineAccess: true,
  //   });
  // }, []);
  // Somewhere in your code

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const { type, data: userData } = await GoogleSignin.signIn();

  //     if (type === "cancelled") {
  //       return;
  //     }

  //     // Получаем idToken и отправляем на сервер
  //     // const { idToken } = userInfo;
  //     const response = await fetch("https://your-backend.com/auth/google", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ idToken: userData.idToken }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Ошибка при аутентификации");
  //     }

  //     const data = await response.json();
  //     // Сохраните accessToken и refreshToken, например, в SecureStore или AsyncStorage
  //     console.log("Access Token:", data.accessToken);
  //     console.log("Refresh Token:", data.refreshToken);
  //     Alert.alert("Успех", "Вход выполнен успешно");
  //   } catch (error: any) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // Пользователь отменил вход
  //       Alert.alert("Отмена", "Вход отменен пользователем");
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // Вход уже в процессе
  //       Alert.alert("В процессе", "Вход уже выполняется");
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // Сервисы Google Play недоступны
  //       Alert.alert("Ошибка", "Google Play Services недоступны");
  //     } else {
  //       // Другая ошибка
  //       console.error(error);
  //       Alert.alert("Ошибка", "Произошла ошибка при входе");
  //     }
  //   }
  // };

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
