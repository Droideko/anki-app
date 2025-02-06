import { useMemo } from 'react';

import useSearchDebounce from '@shared/hooks/useSearchDebounce';
import { Card } from '@shared/store/useCardsStore';

const useDebouncedCards = (cards: Card[]) => {
  const [searchQuery, debouncedSearch] = useSearchDebounce();

  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) {
      return cards;
    }

    const lowercasedQuery = searchQuery.toLowerCase();

    return cards.filter(
      ({ front, back }) =>
        front.toLowerCase().includes(lowercasedQuery) ||
        back.toLowerCase().includes(lowercasedQuery),
    );
  }, [cards, searchQuery]);

  return {
    filteredCards,
    debouncedSearch,
  };
};

export default useDebouncedCards;
