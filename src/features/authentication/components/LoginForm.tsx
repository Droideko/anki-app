import FormInput from "@/src/shared/components/forms/FormInput";
import FormInputPassword from "@/src/features/authentication/components/FormInputPassword";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import useOnLogIn from "../hooks/useOnLogIn";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants";

function LoginForm() {
  const { primary } = useThemeColor();
  const { control, handleSubmit } = useOnLogIn();

  return (
    <>
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="required"
        rules={{
          required: "Email is required",
          pattern: {
            value: EMAIL_REGEX,
            message: "Email is invalid",
          },
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInputPassword
        control={control}
        name="password"
        label="Password"
        placeholder="required"
        rules={{
          required: "Password is required",
          pattern: {
            value: PASSWORD_REGEX,
            message: "Password must contain only English letters", // NEED CHANGE LOCALIZATION
          },
        }}
      />

      <ThemedButton
        style={{ marginBottom: 8 }}
        onPress={handleSubmit}
        buttonColor={primary}
      >
        Log In
      </ThemedButton>
    </>
  );
}

export default LoginForm;
