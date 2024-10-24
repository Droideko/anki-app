import React from 'react';
import { useRouter } from 'expo-router';

import { Text } from '@shared/components/ui/ThemedText';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function SignUpButton() {
  const { push } = useRouter();
  const { primary } = useThemeColor();

  return (
    <ThemedButton
      buttonColor={primary}
      icon="email"
      onPress={() => push('/sign-up')}
    >
      <Text>Continue with Email</Text>
    </ThemedButton>
  );
}
