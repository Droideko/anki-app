import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import ReviewCards from './ReviewCards';

import useFetchDeckCards from '@shared/hooks/useFetchDeckCards';
import { Text } from '@shared/components/ui/ThemedText';

export default function ReviewContent() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const { loading, error, cards } = useFetchDeckCards(Number(deckId));

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  if (cards.length === 0) return <Text>No cards in this deck</Text>;

  return <ReviewCards cards={cards} />;
}
