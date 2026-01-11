import React from 'react';
import { Icon } from 'react-native-paper';
import { Platform } from 'react-native';

import ThemedButton from '@shared/components/ui/ThemedButton';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Text } from '@shared/components/ui/ThemedText';

function AppleButton() {
  if (Platform.OS === 'ios') {
    return <AppleButtonContent />;
  }
  return null;
}

function AppleButtonContent() {
  const { background } = useThemeColor();

  const onAuth = () => {
    console.log('apple auth');
  };

  return (
    <ThemedButton
      buttonColor={background}
      icon={() => <Icon source="apple" size={20} />}
      onPress={onAuth}
    >
      <Text>Continue with Apple</Text>
    </ThemedButton>
  );
}

export default AppleButton;
