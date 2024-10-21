import { StyleSheet } from "react-native";

import { Text } from "@/src/shared/components/ui/ThemedText";
import { Redirect } from "expo-router";
import useRenderChangedLanguage from "@/src/shared/hooks/useRenderChangedLanguage";
import HomeContainer from "@/src/features/home/components/HomeContainer";
import { useSession } from "@/src/shared/contexts/SessionProvider";

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
