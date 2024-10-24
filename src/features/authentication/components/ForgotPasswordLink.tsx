import React from 'react';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Text } from '@shared/components/ui/ThemedText';

function ForgotPasswordLink() {
  const { primary } = useThemeColor();

  return (
    <Text style={styles.text} variant="bodyMedium">
      <Link style={[{ color: primary }, styles.link]} href={'/password-reset'}>
        Forgot password?
      </Link>
    </Text>
  );
}

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 16,
    textAlign: 'right',
  },
});

export default ForgotPasswordLink;
