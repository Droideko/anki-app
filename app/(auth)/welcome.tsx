import { StyleSheet } from "react-native";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { Text } from "@/src/shared/components/ui/ThemedText";
import TermsAndPrivacyNotice from "@/src/features/authentication/components/TermsAndPrivacyNotice";
import AppleButton from "@/src/features/authentication/components/AppleButton";
import SignUpButton from "@/src/features/authentication/components/SignUpButton";
import SignInPrompt from "@/src/features/authentication/components/SignInPrompt";
import GoogleButton from "@/src/features/authentication/components/GoogleButton";

export default function WelcomeScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <Text style={styles.title} variant="headlineMedium">
        Welcome to Anki App
      </Text>
      <Text style={styles.title} variant="headlineMedium">
        Sign up for free
      </Text>
      <SignUpButton />
      <GoogleButton />
      <AppleButton />
      <SignInPrompt />
      <TermsAndPrivacyNotice />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
});
