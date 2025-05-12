import React from 'react';
import { Slot, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { ThemedView } from '@shared/components/ui/ThemedView';

export const ReviewLayout = () => {
  const { text, secondaryBackground } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: secondaryBackground,
        },
        headerTintColor: text,
      }}
    >
      <Stack.Screen
        name="[deckId]/language"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Select Language',
        }}
      />
      <Stack.Screen
        name="[deckId]/settings"
        options={{
          // presentation: 'modal',
          headerShown: true,
          headerTitle: 'Settings',
        }}
      />
      <Stack.Screen
        name="[deckId]/font"
        options={{
          presentation: 'modal',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="[deckId]/edit"
        options={{
          presentation: 'modal',
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default ReviewLayout;
