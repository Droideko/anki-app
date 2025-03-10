import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';

import useFetchDeckCards from '../../../shared/hooks/useFetchDeckCards';
import { useCardsRepository } from '../hooks/useCardsRepository';
import useDebouncedCards from '../hooks/useDebouncedCards';
import useDeleteSelectedCards from '../hooks/useDeleteSelectedCards';

import CardView from './CardView';
import DeckEmpty from './DeckEmpty';
import ConditionalButton from './ConditionalButton';
import BottomPanel from './BottomPanel';

import { Text } from '@shared/components/ui/ThemedText';
import useRefresh from '@shared/hooks/useRefresh';
import Search from '@shared/components/Search';
import LoadingSpinner from '@shared/components/ui/LoadingSpinner';
import { useSelectStore } from '@shared/store/useSelectStore';

export default function CardsDataContent() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const { loading, error, cards } = useFetchDeckCards(Number(deckId));

  const { getDeckCards } = useCardsRepository();
  const [refreshing, onRefresh] = useRefresh([
    () => getDeckCards(Number(deckId)),
  ]);

  const onDeleteSelectedCards = useDeleteSelectedCards(Number(deckId));
  // const { selectedCards, selectCard, selectAllCards } = useSelectStore();
  // const selectedCards = useSelectStore((state) => state.selectedCards);
  // const selectCard = useSelectStore((state) => state.selectCard);
  // const selectAllCards = useSelectStore((state) => state.selectAllCards);
  const { selectedCards, selectAllCards } = useSelectStore(
    useShallow((state) => ({
      selectedCards: state.selectedCards,
      selectAllCards: state.selectAllCards,
    })),
  );

  const selectionMode = selectedCards.length > 0;

  const { setSearch, filteredCards } = useDebouncedCards(cards);

  if (loading) return <LoadingSpinner />;
  if (error) return <Text>Error {error.message}</Text>;
  if (cards.length === 0) return <DeckEmpty />;

  console.log('rerender CardsDataContent');

  return (
    <>
      <FlashList
        ListHeaderComponent={
          <Search
            style={styles.searchStyle}
            onChange={setSearch}
            debounceTime={300}
          />
        }
        data={filteredCards}
        refreshing={refreshing}
        onRefresh={onRefresh}
        keyExtractor={(item) => `${item.id}`}
        removeClippedSubviews={true}
        renderItem={({ item: card }) => (
          <CardView
            card={card}
            // selectionMode={selectionMode}
            // selected={selectedCards.includes(card.id)}
            // onSelect={() => selectCard(card.id)}
          />
        )}
        numColumns={2}
        // columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // initialNumToRender={20}
        // windowSize={4}
        // maxToRenderPerBatch={5}
      />
      <BottomPanel
        onSelectAll={() => selectAllCards(cards.map((card) => card.id))}
        onDelete={onDeleteSelectedCards}
        visible={selectionMode}
      />
      <ConditionalButton />
    </>
  );
}

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 60,
    padding: 20,
  },
  searchStyle: {
    marginBottom: 12,
  },
});
