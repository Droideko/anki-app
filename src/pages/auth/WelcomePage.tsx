import React from 'react';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';
import TermsAndPrivacyNotice from '@features/authentication/components/TermsAndPrivacyNotice';
import AppleButton from '@features/authentication/components/AppleButton';
import SignUpButton from '@features/authentication/components/SignUpButton';
import SignInPrompt from '@features/authentication/components/SignInPrompt';
import GoogleButton from '@features/authentication/components/GoogleButton';

export default function WelcomePage() {
  return (
    <ThemedView style={styles.titleContainer}>
      <Text style={styles.title} variant="headlineMedium">
        Welcome to Anki App
      </Text>
      <Text style={styles.title} variant="headlineMedium">
        Sign up for free
      </Text>
      <SignUpButton />
      <GoogleButton />
      <AppleButton />
      <SignInPrompt />
      <TermsAndPrivacyNotice />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
