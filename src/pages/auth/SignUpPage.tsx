import React from 'react';
import { StyleSheet } from 'react-native';

import { Text } from '@shared/components/ui/ThemedText';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import FormTextDivider from '@features/authentication/components/FormTextDivider';
import TermsAndPrivacyNotice from '@features/authentication/components/TermsAndPrivacyNotice';
import AppleButton from '@features/authentication/components/AppleButton';
import SignInPrompt from '@features/authentication/components/SignInPrompt';
import ScrollView from '@shared/components/ScrollView';
import SinUpForm from '@features/authentication/components/SinUpForm';
import GoogleButton from '@features/authentication/components/GoogleButton';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function SignUpPage() {
  return (
    <ThemedView style={{ flex: 1 }}>
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
