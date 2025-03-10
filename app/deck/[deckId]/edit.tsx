import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

import DeckEditContainer from '@features/decks/components/DeckEditContainer';

export default function EditDeck() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Edit ${name}`,
        }}
      />
      <DeckEditContainer />
    </>
  );
}
