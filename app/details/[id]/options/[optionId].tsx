import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';

const Options = () => {
  const { id, optionId, user } = useLocalSearchParams();

  return (
    <ThemedView>
      <Stack.Screen
        options={{ headerTitle: `Details ${id} Option ${optionId}` }}
      />
      <Text>Options {user} </Text>
    </ThemedView>
  );
};

export default Options;
