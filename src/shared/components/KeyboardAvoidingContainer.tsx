import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

export default function KeyboardAvoidingContainer({
  children,
  offsetIOS = 60,
  style,
}: {
  children: React.ReactNode;
  offsetIOS?: number;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <KeyboardAvoidingView
      style={[styles.containerView, style]}
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
