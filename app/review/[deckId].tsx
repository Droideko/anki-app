import React from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@shared/components/ui/ThemedView';
import ReviewContent from '@features/review/components/ReviewContent';
import ReviewBackButton from '@features/review/components/ReviewBackButton';
import DotsIconButton from '@shared/components/ui/DotsIconButton';

export default function ReviewPage() {
  const { name, deckId } = useLocalSearchParams<{
    name: string;
    deckId: string;
  }>();

  const handleOpenSettings = () => {
    router.push(`/review/${deckId}/settings`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${name}`,
          headerRight: () => <DotsIconButton onPress={handleOpenSettings} />,
          headerLeft: (props) => <ReviewBackButton {...props} />,
        }}
      />
      <ThemedView style={{ flex: 1, padding: 12 }}>
        <ReviewContent />
      </ThemedView>
    </>
  );
}
