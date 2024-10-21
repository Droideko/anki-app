import { StyleSheet } from "react-native";
import { Text } from "@/src/shared/components/ui/ThemedText";
import KeyboardAvoidingContainer from "@/src/shared/components/KeyboardAvoidingContainer";
import FormTextDivider from "@/src/features/authentication/components/FormTextDivider";
import TermsAndPrivacyNotice from "@/src/features/authentication/components/TermsAndPrivacyNotice";
import AppleButton from "@/src/features/authentication/components/AppleButton";
import SignInPrompt from "@/src/features/authentication/components/SignInPrompt";
import ScrollView from "@/src/shared/components/ScrollView";
import SinUpForm from "@/src/features/authentication/components/SinUpForm";
import GoogleButton from "@/src/features/authentication/components/GoogleButton";

export default function SignUpScreen() {
  return (
    <KeyboardAvoidingContainer>
      <ScrollView>
        <Text style={styles.title} variant="headlineMedium">
          Sign Up
        </Text>
        <SinUpForm />
        <FormTextDivider />
        <GoogleButton />
        <AppleButton />
        <SignInPrompt />
        <TermsAndPrivacyNotice style={{ marginBottom: 20 }} />
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: "center",
  },
});
