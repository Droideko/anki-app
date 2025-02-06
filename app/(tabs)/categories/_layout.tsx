import { Stack } from 'expo-router';
import React from 'react';

import { useThemeColor } from '@shared/hooks/useThemeColor';

function CategoryLayout() {
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
        name="index"
        options={{
          headerTitle: 'Categories',
        }}
      />
      <Stack.Screen
        name="create-category"
        options={{
          headerShown: true,
          presentation: 'modal',
          headerTitle: 'Create new category',
          contentStyle: { backgroundColor: secondaryBackground },
        }}
      />
      <Stack.Screen
        name="[id]/create-deck-or-subcategory"
        options={{
          headerShown: true,
          presentation: 'modal',
          headerTitle: 'Create new',
          contentStyle: { backgroundColor: secondaryBackground },
        }}
      />
      <Stack.Screen
        name="[id]/move"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      {/* <Stack.Screen
        name="[id]/decks/[deckId]/create-card"
        options={{
          headerShown: true,
          headerTitle: 'Create Card',
        }}
      /> */}
      <Stack.Screen
        name="[id]/edit"
        options={{
          headerShown: true,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="[id]/decks/[deckId]/edit"
        options={{
          headerShown: true,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}

export default CategoryLayout;
