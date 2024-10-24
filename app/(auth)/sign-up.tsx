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

export default function SignUpScreen() {
  return (
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
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
