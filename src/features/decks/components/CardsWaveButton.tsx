import React, { useMemo } from 'react';
import { Href, useLocalSearchParams } from 'expo-router';
import { StyleProp, ViewStyle } from 'react-native';

import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import WaveButton from '@shared/components/WaveButton';
import { useCardsStore } from '@shared/store/useCardsStore';

interface CardsWaveButtonProps {
  href: Href;
  style?: StyleProp<ViewStyle>;
}

function CardsWaveButton(props: CardsWaveButtonProps) {
  const { cardsById } = useCardsStore();
  const { decksById } = useCategoriesStore();

  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const isActivePulse = useMemo(() => {
    const deck = decksById[Number(deckId)];
    return !deck?.cardIds?.some((id) => cardsById[id]);
  }, [cardsById, deckId, decksById]);

  return <WaveButton isActivePulse={isActivePulse} {...props} />;
}

export default CardsWaveButton;
