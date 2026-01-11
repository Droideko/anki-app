import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import FormInput from '@shared/components/forms/FormInput';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import ScrollView from '@shared/components/ScrollView';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function PasswordResetPage() {
  const { primary } = useThemeColor();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = ({ email }: { email: string }) => {
    console.log(email);
  };

  return (
    <ThemedView style={{ flex: 1 }}>
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
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email is invalid',
              },
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <ThemedButton onPress={handleSubmit(onSubmit)} buttonColor={primary}>
            <Text>Reset Password</Text>
          </ThemedButton>
        </ScrollView>
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
