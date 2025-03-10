import React from 'react';
import { Stack } from 'expo-router';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export const DeckLayout = () => {
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
      {/* <Stack.Screen
        name="[deckId]/card/create"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      /> */}
      <Stack.Screen
        name="[deckId]/card/generate"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Generate',
        }}
      />
      <Stack.Screen
        name="[deckId]/card/language"
        options={{
          presentation: 'modal',
          headerShown: true,
          headerTitle: 'Select Language',
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

export default DeckLayout;
