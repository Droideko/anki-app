import React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@shared/components/ui/ThemedText';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import ScrollView from '@shared/components/ScrollView';
import TermsAndPrivacyNotice from '@features/authentication/components/TermsAndPrivacyNotice';
import FormTextDivider from '@features/authentication/components/FormTextDivider';
import AppleButton from '@features/authentication/components/AppleButton';
import SignUpPrompt from '@features/authentication/components/SignUpPrompt';
import ForgotPasswordLink from '@features/authentication/components/ForgotPasswordLink';
import LoginForm from '@features/authentication/components/LoginForm';
import GoogleButton from '@features/authentication/components/GoogleButton';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function LogInPage() {
  return (
    <ThemedView style={styles.container}>
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
          <TermsAndPrivacyNotice style={styles.terms} />
        </ScrollView>
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  terms: {
    marginBottom: 20,
  },
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
