import { Stack } from 'expo-router';
import React from 'react';

import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function MoveLayout() {
  const { primary, text, secondaryBackground } = useThemeColor();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: secondaryBackground,
        },
        headerTintColor: text,
      }}
    >
      {/* <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Move Category',
        }}
      /> */}
      {/* <Stack.Screen
        name="[subCategoryId]"
        options={{
          headerTitle: 'Select Subcategory',
        }}
      /> */}
    </Stack>
  );
}
