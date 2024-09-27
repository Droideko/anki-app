import { StyleSheet } from "react-native";
import { Text } from "@/components/ThemedText";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import TextDivider from "@/components/TextDivider";
import TermsAndPrivacyNotice from "@/components/auth/TermsAndPrivacyNotice";
import GoogleButton from "@/components/auth/GoogleButton";
import AppleButton from "@/components/auth/AppleButton";
import SignInPrompt from "@/components/auth/SignInPrompt";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import SinUpForm from "@/components/auth/SignUpForm";

export default function SignUpScreen() {
  return (
    <KeyboardAvoidingContainer>
      <ParallaxScrollView>
        <Text style={styles.title} variant="headlineMedium">
          Sign Up
        </Text>
        <SinUpForm />
        <TextDivider />
        <GoogleButton />
        <AppleButton />
        <SignInPrompt />
        <TermsAndPrivacyNotice style={{ marginBottom: 20 }} />
      </ParallaxScrollView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
});
