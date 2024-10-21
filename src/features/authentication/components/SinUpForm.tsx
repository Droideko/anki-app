import FormInput from "@/src/shared/components/forms/FormInput";
import FormInputPassword from "@/src/features/authentication/components/FormInputPassword";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import i18n from "@/src/shared/utils/i18n";
import {
  EMAIL_REGEX,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from "@/src/features/authentication/constants";
import useOnSignUp from "@/src/features/authentication/hooks/useOnSignUp";

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
