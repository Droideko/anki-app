import useStackScreenOptions from "@/hooks/useStackScreenOptions";
import { Stack } from "expo-router";

const DEFAULT_SCREEN_OPTIONS = {
  headerShown: true,
  headerTitle: "",
  headerBackTitleVisible: false,
};

export const AuthStack = () => {
  const stackScreenOptions = useStackScreenOptions();

  return (
    <Stack screenOptions={stackScreenOptions}>
      {/* <Stack.Screen name="(auth)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={DEFAULT_SCREEN_OPTIONS} />
      <Stack.Screen name="sign-up" options={DEFAULT_SCREEN_OPTIONS} />
      <Stack.Screen name="password-reset" options={DEFAULT_SCREEN_OPTIONS} />
    </Stack>
  );
};

export default function AuthLayout() {
  return <AuthStack />;
}
