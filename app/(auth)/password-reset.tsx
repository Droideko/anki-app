import { useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import FormInput from "@/src/shared/components/forms/FormInput";
import KeyboardAvoidingContainer from "@/src/shared/components/KeyboardAvoidingContainer";
import ScrollView from "@/src/shared/components/ScrollView";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import { Text } from "@/src/shared/components/ui/ThemedText";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

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
      <ScrollView style={styles.titleContainer}>
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
