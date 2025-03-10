import { useEffect, useState } from 'react';

import { Card } from '@shared/store/useCardsStore';
import { useMountedState } from '@shared/hooks/useMountedState';
import { RepositoryError } from '@shared/utils/errorHandler';
import { useCardsRepository } from '@features/decks/hooks/useCardsRepository';
import { useDeckCards } from '@features/decks/hooks/useDeckCards';

interface FetchResult {
  loading: boolean;
  error: Error | null;
  cards: Card[];
}

export default function useFetchDeckCards(deckId: number): FetchResult {
  const isMounted = useMountedState();

  const cards = useDeckCards(deckId);

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

  return { loading, error, cards };
}
