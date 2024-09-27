import { StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ThemedText";
import TermsAndPrivacyNotice from "@/components/auth/TermsAndPrivacyNotice";
import ThemedButton from "@/components/ThemedButton";
import GoogleButton from "@/components/auth/GoogleButton";
import AppleButton from "@/components/auth/AppleButton";
import SignUpButton from "@/components/auth/SignUpButton";
import SignInPrompt from "@/components/auth/SignInPrompt";

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
