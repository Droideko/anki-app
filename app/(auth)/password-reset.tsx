import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import FormInput from "@/components/FormInput";
import KeyboardAvoidingContainer from "@/components/KeyboardAvoidingContainer";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ThemedButton from "@/components/ThemedButton";
import { Text } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function PasswordReset() {
  const { primary } = useThemeColor();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = ({ email }: { email: string }) => {
    console.log(email);
  };

  return (
    <KeyboardAvoidingContainer>
      <ParallaxScrollView style={styles.titleContainer}>
        <Text style={styles.title} variant="headlineMedium">
          Reset Password
        </Text>

        <Text style={{ marginBottom: 16 }} variant="bodyMedium">
          Enter your email address below, and we will send you instructions on
          how to reset your password.
        </Text>

        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="required"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Email is invalid",
            },
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <ThemedButton onPress={handleSubmit(onSubmit)} buttonColor={primary}>
          Reset Password
        </ThemedButton>
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
