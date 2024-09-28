import { Image, StyleSheet, Button, Pressable } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, Redirect } from "expo-router";
import CustomSwitch from "@/components/CustomSwitch";
import { i18n } from "@/store/languageStore";
import useRenderChangedLanguage from "@/hooks/useRenderChangedLanguage";
import LogOutButton from "@/components/auth/LogOutButton";
import { useSession } from "@/src/contexts/SessionProvider";
import HomeContainer from "@/src/components/home/HomeContainer";

// const configureGoogleSignIn = () => {
//   GoogleSignin.configure({
//     scopes: ["email", "profile"], // Запрашиваемые разрешения
//     webClientId: "YOUR_WEB_CLIENT_ID", // Клиентский ID для веб-приложений (необходим для получения токена на сервере)
//     iosClientId: "YOUR_IOS_CLIENT_ID", // (Опционально) если отличается от webClientId
//     offlineAccess: true, // Если нужен refresh token
//     forceCodeForRefreshToken: true, // Если нужно
//     // при использовании iOS, добавь reservedClientId через конфигурацию Expo
//   });
// };

export default function HomeScreen() {
  const { user, isLoading } = useSession();
  useRenderChangedLanguage();

  // const signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const response = await GoogleSignin.signIn();
  //     if (isSuccessResponse(response)) {
  //       console.log("response", response);
  //     } else {
  //       // sign in was cancelled by user
  //     }
  //   } catch (error: unknown) {
  //     if (isErrorWithCode(error)) {
  //       switch (error.code) {
  //         case statusCodes.IN_PROGRESS:
  //           // operation (eg. sign in) already in progress
  //           break;
  //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //           // Android only, play services not available or outdated
  //           break;
  //         default:
  //         // some other error happened
  //       }
  //     } else {
  //       // an error that's not related to google sign in occurred
  //     }
  //   }
  // };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/welcome" />;
  }

  return <HomeContainer />;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
