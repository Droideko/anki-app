import FormInput from "@/components/FormInput";
import FormInputPassword from "@/components/auth/FormInputPassword";
import ThemedButton from "@/components/ThemedButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import useOnSignUp from "../hooks/useOnSignUp";
import i18n from "@/global/i18n";
import {
  EMAIL_REGEX,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from "../constants";

function SinUpForm() {
  const { primary } = useThemeColor();
  const { control, handleSubmit } = useOnSignUp();

  return (
    <>
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder={i18n.t("auth.placeholder")}
        rules={{
          required: `${i18n.t("auth.rules.email.required")}`,
          pattern: {
            value: EMAIL_REGEX,
            message: `${i18n.t("auth.rules.email.invalid")}`,
          },
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormInputPassword
        control={control}
        name="password"
        label="Password"
        placeholder={i18n.t("auth.placeholder")}
        rules={{
          required: `${i18n.t("auth.rules.email.required")}`,
          maxLength: {
            value: MAX_PASSWORD_LENGTH,
            message: `макс длина 30`,
          },
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: `${i18n.t("auth.rules.password.minLength")}`,
          },
          pattern: {
            value: PASSWORD_REGEX,
            message: "Password must contain only English letters",
          },
        }}
      />

      <ThemedButton onPress={handleSubmit} buttonColor={primary}>
        Create
      </ThemedButton>
    </>
  );
}

export default SinUpForm;
