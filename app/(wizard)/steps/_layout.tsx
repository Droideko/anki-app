import { Stack } from 'expo-router';
import React from 'react';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function WizardStepsLayout() {
  const { text, secondaryBackground } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        presentation: 'card',
        headerShown: true,
        headerStyle: {
          backgroundColor: secondaryBackground,
        },
        headerTintColor: text,
      }}
    >
      <Stack.Screen
        name="step1"
        options={{
          headerTitle: 'Learning Language',
        }}
      />
      <Stack.Screen
        key="step2"
        name="step2"
        options={{
          headerTitle: 'Native Language',
        }}
      />
      <Stack.Screen
        key="step3"
        name="step3"
        options={{
          headerTitle: 'Language Level',
        }}
      />
      <Stack.Screen
        key="step4"
        name="step4"
        options={{
          headerTitle: 'Generate Cards',
        }}
      />
    </Stack>
  );
}
