import { useEffect, useMemo, useState } from 'react';

import { useCardsRepository } from './useCardsRepository';

import { Card, useCardsStore } from '@shared/store/useCardsStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useMountedState } from '@shared/hooks/useMountedState';
import { deckService } from '@shared/api/deckService';
import { RepositoryError } from '@shared/utils/errorHandler';

interface FetchResult {
  loading: boolean;
  error: Error | null;
  cards: Card[];
}

export default function useFetchDeckCards(deckId: number): FetchResult {
  const isMounted = useMountedState();

  const { cardsById } = useCardsStore();
  const { decksById } = useCategoriesStore();

  const { getDeckCards } = useCardsRepository();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        await getDeckCards(deckId);
      } catch (err) {
        if (isMounted() && !isCancelled) {
          if (err instanceof RepositoryError) {
            setError(err);
          } else {
            setError(new Error('Something was wrong'));
          }
        }
      } finally {
        if (isMounted() && !isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, isMounted]);

  const cards = useMemo(() => {
    const deck = decksById[deckId];
    if (!deck || !deck.cardIds) return [];

    return deck.cardIds.map((id) => cardsById[id]).filter(Boolean);
  }, [deckId, decksById, cardsById]);

  return { loading, error, cards };
}
