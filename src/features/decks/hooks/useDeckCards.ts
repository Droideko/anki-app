import { useMemo } from 'react';

import { useCardsStore } from '@shared/store/useCardsStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { Card } from '@shared/store/useCardsStore';

export function useDeckCards(deckId: number): Card[] {
  // Извлекаем только нужные части состояния
  const { cardsById } = useCardsStore();
  const deckCardIds = useCategoriesStore(
    (state) => state.decksById[deckId]?.cardIds,
  );

  // Вычисляем список карточек для колоды
  const deckCards = useMemo(() => {
    if (!deckCardIds) return [];
    return deckCardIds.map((id) => cardsById[id]);
    // return deckCardIds.map((id) => cardsById[id]).filter(Boolean);
  }, [cardsById, deckCardIds]);

  return deckCards;
}
