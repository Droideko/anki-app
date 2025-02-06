import React, { useMemo } from 'react';
import { Href, useLocalSearchParams } from 'expo-router';

import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import WaveButton from '@shared/components/WaveButton';
import { useCardsStore } from '@shared/store/useCardsStore';

interface CardsWaveButtonProps {
  href: Href;
}

function CardsWaveButton({ href }: CardsWaveButtonProps) {
  const { cardsById } = useCardsStore();
  const { decksById } = useCategoriesStore();

  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const isActivePulse = useMemo(() => {
    const deck = decksById[Number(deckId)];
    return !deck.cardIds?.some((id) => cardsById[id]);
  }, [cardsById, deckId, decksById]);

  return <WaveButton href={href} isActivePulse={isActivePulse} />;
}

export default CardsWaveButton;
