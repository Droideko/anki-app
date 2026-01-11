import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { Link } from 'expo-router';

import { Text } from '@shared/components/ui/ThemedText';

const TermsAndPrivacyNotice = ({ style }: { style?: StyleProp<TextStyle> }) => {
  return (
    <Text style={[{ ...styles.text }, style]} variant="bodySmall">
      By signing up, you accept Anki&apos;s{' '}
      <Link style={styles.link} href={'#'}>
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link style={styles.link} href={'#'}>
        Privacy Policy
      </Link>
    </Text>
  );
};

const styles = StyleSheet.create({
  link: {
    textDecorationLine: 'underline',
  },
  text: {
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default TermsAndPrivacyNotice;
