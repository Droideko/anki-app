import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Text } from '@shared/components/ui/ThemedText';

function SignInPrompt() {
  const { primary } = useThemeColor();

  return (
    <Text style={styles.text} variant="bodyLarge">
      Do you have already Account?{' '}
      <Link style={[{ color: primary }, styles.textLink]} href={'/login'}>
        Log In
      </Link>
    </Text>
  );
}

export default SignInPrompt;

const styles = StyleSheet.create({
  text: {
    marginBottom: 16,
    textAlign: 'center',
  },
  textLink: {
    fontWeight: 'bold',
  },
});
