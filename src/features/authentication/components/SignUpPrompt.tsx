import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text } from '../../../shared/components/ui/ThemedText';

import { useThemeColor } from '@shared/hooks/useThemeColor';

function SignUpPrompt() {
  const { primary } = useThemeColor();

  return (
    <Text style={styles.text} variant="bodyLarge">
      Don&apos;t have an account?{' '}
      <Link style={[{ color: primary }, styles.linkText]} href={'/sign-up'}>
        Sign up
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  linkText: {
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SignUpPrompt;
