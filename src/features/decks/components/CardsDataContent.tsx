import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';

import useFetchDeckCards from '../hooks/useFetchDeckCards';
import { useCardsRepository } from '../hooks/useCardsRepository';
import useDebouncedCards from '../hooks/useDebouncedCards';

import CardView from './CardView';
import DeckSkeleton from './DeckSkeleton';

import { Text } from '@shared/components/ui/ThemedText';
import useRefresh from '@shared/hooks/useRefresh';
import Search from '@shared/components/Search';

export default function CardsDataContent() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const { loading, error, cards } = useFetchDeckCards(Number(deckId));

  const { getDeckCards } = useCardsRepository();
  const [refreshing, onRefresh] = useRefresh(() =>
    getDeckCards(Number(deckId)),
  );

  const { debouncedSearch, filteredCards } = useDebouncedCards(cards);

  if (loading) return <DeckSkeleton />;
  if (error) return <Text>Error {error.message}</Text>;
  if (cards.length === 0) return <Text>No cards found</Text>;

  return (
    <FlatList
      ListHeaderComponent={
        <Search style={styles.searchStyle} onChangeCallback={debouncedSearch} />
      }
      data={filteredCards}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: card }) => <CardView card={card} />}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      windowSize={6}
    />
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 55,
    padding: 20,
  },
  searchStyle: {
    marginBottom: 12,
  },
});
