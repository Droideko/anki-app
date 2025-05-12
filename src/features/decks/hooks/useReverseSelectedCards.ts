import { useCallback } from 'react';

import { useCardsRepository } from './useCardsRepository';

import { useAsyncFn } from '@shared/hooks/useAsyncFn';
// import { UpdateCardDto } from '@shared/api/deckService';
import { useSelectStore } from '@shared/store/useSelectStore';
import { useDetectSoundStore } from '@shared/store/useDetectSoundStore';

const useReverseSelectedCards = (deckId: number, cardSize: number) => {
  const { reverseCards } = useCardsRepository();
  const { selectedCards, clearCards } = useSelectStore();
  const { setReverseCard } = useDetectSoundStore();

  const [_, sendData] = useAsyncFn(
    async (deckId: number, ids: number[]) => {
      return reverseCards(deckId, ids);
    },
    [reverseCards],
  );

  return useCallback(async () => {
    // TODO: Возможно нужно поменять на сервере API, так как сейчас используется PATCH и возвращается большой массив данных в ответе
    await sendData(deckId, selectedCards);
    if (selectedCards.length === cardSize) {
      setReverseCard(true);
    }

    clearCards();
  }, [cardSize, clearCards, deckId, selectedCards, sendData, setReverseCard]);
};

export default useReverseSelectedCards;
