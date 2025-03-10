import { useMemo, useState } from 'react';

import { Card } from '@shared/store/useCardsStore';

const useDebouncedCards = (cards: Card[]) => {
  const [search, setSearch] = useState('');

  const filteredCards = useMemo(() => {
    if (!search.trim()) {
      return cards;
    }

    const lowercasedQuery = search.toLowerCase();

    return cards.filter(
      ({ front, back }) =>
        front.toLowerCase().includes(lowercasedQuery) ||
        back.toLowerCase().includes(lowercasedQuery),
    );
  }, [cards, search]);

  return {
    filteredCards,
    setSearch,
  };
};

export default useDebouncedCards;
