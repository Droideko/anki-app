import React from 'react';
import { useForm } from 'react-hook-form';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';

import FormInput from '@shared/components/forms/FormInput';
import FormInputPassword from '@features/authentication/components/FormInputPassword';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Text } from '@shared/components/ui/ThemedText';
import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
import { SignUpFormData } from '@shared/types/category';
import { DEFAULT_SIGN_UP_VALUES } from '@shared/constants/category';
import { useSession } from '@shared/contexts/SessionProvider';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { handleFormError } from '@shared/utils/handleFormError';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from '@features/authentication/constants';

function LoginForm() {
  const { primary } = useThemeColor();
  const { signIn } = useSession();

  const { control, handleSubmit, setError } = useForm<SignUpFormData>({
    defaultValues: DEFAULT_SIGN_UP_VALUES,
  });

  const [{ loading }, onSubmit] = useAsyncFn(async (data: SignUpFormData) => {
    try {
      await signIn(data);
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
        placeholder="required"
        rules={{
          required: 'Email is required',
          pattern: {
            value: EMAIL_REGEX,
            message: 'Email is invalid',
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
          required: 'Password is required',
          pattern: {
            value: PASSWORD_REGEX,
            message: 'Password must contain only English letters',
          },
        }}
      />
      <ThemedButton
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        buttonColor={primary}
      >
        <Text>Log In</Text>
      </ThemedButton>
      {loading && <LoadingIndicator />}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 8,
  },
});

export default LoginForm;
