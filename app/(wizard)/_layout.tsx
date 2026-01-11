import { Stack } from 'expo-router';
import React from 'react';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function WizardLayout() {
  const { text, secondaryBackground } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
    />
  );
}
