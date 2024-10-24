import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { Text } from '@shared/components/ui/ThemedText';
import { ThemedView } from '@shared/components/ui/ThemedView';

function DeckItem() {
  const { id } = useLocalSearchParams();

  // get Information from Server or Storage (SQLLite)

  return (
    <ThemedView>
      <Stack.Screen options={{ headerTitle: `Deck #${id}` }} />
      <Text>Deck - {id}</Text>
    </ThemedView>
  );
}

export default DeckItem;
