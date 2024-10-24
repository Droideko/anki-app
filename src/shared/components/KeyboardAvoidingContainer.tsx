import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export default function KeyboardAvoidingContainer({
  children,
  offsetIOS = 60,
}: {
  children: React.ReactNode;
  offsetIOS?: number;
}) {
  return (
    <KeyboardAvoidingView
      style={styles.containerView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? offsetIOS : 0}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
});
