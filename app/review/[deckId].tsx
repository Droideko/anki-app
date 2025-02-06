import React from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { HeaderBackButton } from '@react-navigation/elements';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';
import ReviewContent from '@features/review/components/ReviewContent';

export default function ReviewPage() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `${name}`,
          headerRight: () => <Text>Right</Text>,
          headerLeft: (props) => (
            <HeaderBackButton
              style={{ marginLeft: -12 }}
              {...props}
              onPress={() => router.back()}
            />
          ),
          headerBackTitle: 'Back',
        }}
      />
      <ThemedView style={{ flex: 1, padding: 20 }}>
        <ReviewContent />
      </ThemedView>
    </>
  );
}
