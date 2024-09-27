import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import ThemeProvider, { useTheme } from "@/components/CustomThemeProvide";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLanguageStore } from "@/store/languageStore";

import { SQLiteProvider } from "@/src/contexts/SQLiteProvider";
import { SessionProvider } from "@/src/contexts/SessionProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function Stacks() {
  const { background } = useThemeColor();

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="drawer" options={{ headerShown: false }} />
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

  console.log("INITIAL");

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
          <SessionProvider>
            <Stacks />
          </SessionProvider>
        </SQLiteProvider>
      </Layout>
    </ThemeProvider>
  );
}
