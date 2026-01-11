import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { FlashList } from '@shopify/flash-list';

import useFetchDeckCards from '../../../shared/hooks/useFetchDeckCards';
import { useCardsRepository } from '../hooks/useCardsRepository';
import useDebouncedCards from '../hooks/useDebouncedCards';
import useDeleteSelectedCards from '../hooks/useDeleteSelectedCards';
import useReverseSelectedCards from '../hooks/useReverseSelectedCards';
import useEffectSoundLanguages from '../utils/useEffectOnce';

import CardView from './CardView';
import DeckEmpty from './DeckEmpty';
import BottomPanel from './BottomPanel';
import StartButton from './StartButton';

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

  useEffectSoundLanguages(cards);

  const onDeleteSelectedCards = useDeleteSelectedCards(Number(deckId));
  const onReverseSelectedCards = useReverseSelectedCards(
    Number(deckId),
    cards.length,
  );

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
        renderItem={({ item: card }) => <CardView card={card} />}
        numColumns={2}
        estimatedItemSize={80}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <BottomPanel
        onSelectAll={() => selectAllCards(cards.map((card) => card.id))}
        onReverse={onReverseSelectedCards}
        onDelete={onDeleteSelectedCards}
        visible={selectionMode}
      />
      <StartButton />
    </>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 80,
    padding: 20,
  },
  searchStyle: {
    marginBottom: 12,
  },
});
