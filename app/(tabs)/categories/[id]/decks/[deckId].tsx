import React from 'react';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import CardsDataContent from '@features/decks/components/CardsDataContent';
import CardsWaveButton from '@features/decks/components/CardsWaveButton';
import DeleteModal from '@features/categories/components/DeleteModal';
import BlurModal from '@shared/components/modal/BlurModal';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';

const DeckPage = () => {
  const { id, name, deckId } = useLocalSearchParams<{
    id: string;
    name: string;
    deckId: string;
  }>();
  const { primary } = useThemeColor();

  if (typeof id === 'undefined' || typeof deckId === 'undefined') {
    return null;
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: `${name}`,
          headerRight: () => (
            <Ionicons color={primary} size={22} name={'filter'} />
          ),
        }}
      />
      <CardsDataContent />
      <CardsWaveButton
        href={`/categories/${id}/decks/${deckId}/create-card?action=add`}
      />
      <Link href={`/review/${deckId}?name=${name}`}>
        <Text>Link</Text>
      </Link>

      <BlurModal />
      <DeleteModal />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DeckPage;
