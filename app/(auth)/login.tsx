import { StyleSheet } from "react-native";
import { Text } from "@/components/ThemedText";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import TermsAndPrivacyNotice from "@/components/auth/TermsAndPrivacyNotice";
import TextDivider from "@/components/TextDivider";
import GoogleButton from "@/components/auth/GoogleButton";
import AppleButton from "@/components/auth/AppleButton";
import SignUpPrompt from "@/components/auth/SignUpPrompt";
import ForgotPasswordLink from "@/components/auth/ForgotPasswordLink";
import LoginForm from "@/components/auth/LoginForm";

export default function LogInScreen() {
  return (
    <KeyboardAvoidingContainer>
      <ParallaxScrollView style={styles.titleContainer}>
        <Text style={styles.title} variant="headlineMedium">
          Log In
        </Text>
        <LoginForm />
        <ForgotPasswordLink />
        <TextDivider />
        <GoogleButton />
        <AppleButton />
        <SignUpPrompt />
        <TermsAndPrivacyNotice style={{ marginBottom: 20 }} />
      </ParallaxScrollView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
});
