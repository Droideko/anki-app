import { StyleSheet } from "react-native";
import { Text } from "@/src/shared/components/ui/ThemedText";
import KeyboardAvoidingContainer from "@/src/shared/components/KeyboardAvoidingContainer";
import ScrollView from "@/src/shared/components/ScrollView";
import TermsAndPrivacyNotice from "@/src/features/authentication/components/TermsAndPrivacyNotice";
import FormTextDivider from "@/src/features/authentication/components/FormTextDivider";
import AppleButton from "@/src/features/authentication/components/AppleButton";
import SignUpPrompt from "@/src/features/authentication/components/SignUpPrompt";
import ForgotPasswordLink from "@/src/features/authentication/components/ForgotPasswordLink";
import LoginForm from "@/src/features/authentication/components/LoginForm";
import GoogleButton from "@/src/features/authentication/components/GoogleButton";

export default function LogInScreen() {
  return (
    <KeyboardAvoidingContainer>
      <ScrollView style={styles.titleContainer}>
        <Text style={styles.title} variant="headlineMedium">
          Log In
        </Text>
        <LoginForm />
        <ForgotPasswordLink />
        <FormTextDivider />
        <GoogleButton />
        <AppleButton />
        <SignUpPrompt />
        <TermsAndPrivacyNotice style={{ marginBottom: 20 }} />
      </ScrollView>
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
