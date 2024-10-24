import React from 'react';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';

import FormInput from '@shared/components/forms/FormInput';
import FormInputPassword from '@features/authentication/components/FormInputPassword';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import i18n from '@shared/utils/i18n';
import { Text } from '@shared/components/ui/ThemedText';
import { useSession } from '@shared/contexts/SessionProvider';
import { DEFAULT_SIGN_UP_VALUES } from '@shared/constants/category';
import { SignUpFormData } from '@shared/types/category';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { handleFormError } from '@shared/utils/handleFormError';
import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
import {
  EMAIL_REGEX,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REGEX,
} from '@features/authentication/constants';

function SinUpForm() {
  const { primary } = useThemeColor();
  const { signUp } = useSession();

  const { control, handleSubmit, setError } = useForm<SignUpFormData>({
    defaultValues: DEFAULT_SIGN_UP_VALUES,
  });

  const [{ loading }, onSubmit] = useAsyncFn(async (data: SignUpFormData) => {
    try {
      await signUp(data);
      router.replace('/');
    } catch (error: unknown) {
      handleFormError(error, setError, 'email');
    }
  });

  return (
    <>
      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder={i18n.t('auth.placeholder')}
        rules={{
          required: `${i18n.t('auth.rules.email.required')}`,
          pattern: {
            value: EMAIL_REGEX,
            message: `${i18n.t('auth.rules.email.invalid')}`,
          },
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormInputPassword
        control={control}
        name="password"
        label="Password"
        placeholder={i18n.t('auth.placeholder')}
        rules={{
          required: `${i18n.t('auth.rules.email.required')}`,
          maxLength: {
            value: MAX_PASSWORD_LENGTH,
            message: `макс длина 30`,
          },
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: `${i18n.t('auth.rules.password.minLength')}`,
          },
          pattern: {
            value: PASSWORD_REGEX,
            message: 'Password must contain only English letters',
          },
        }}
      />
      <ThemedButton onPress={handleSubmit(onSubmit)} buttonColor={primary}>
        <Text>Create</Text>
      </ThemedButton>
      {loading && <LoadingIndicator />}
    </>
  );
}

export default SinUpForm;
