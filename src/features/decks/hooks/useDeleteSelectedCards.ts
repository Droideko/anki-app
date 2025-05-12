import { useCallback } from 'react';

import { useCardsRepository } from './useCardsRepository';

import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { UpdateCardDto } from '@shared/api/deckService';
import showAlert from '@shared/utils/showAlert';
import { useSelectStore } from '@shared/store/useSelectStore';

const useDeleteSelectedCards = (deckId: number) => {
  const { updateCards } = useCardsRepository();
  const { selectedCards, clearCards } = useSelectStore();

  const [_, sendData] = useAsyncFn(
    async (deckId: number, cards: UpdateCardDto[]) => {
      return updateCards(deckId, { cards });
    },
    [],
  );

  return useCallback(() => {
    showAlert({
      alertTitle: 'Delete selected Cards?',
      alertMessage: 'This action cannot be undone.',
      onConfirm: async () => {
        const cards = selectedCards.map((id) => ({ deleted: true, id }));
        // TODO: Возможно нужно поменять на сервере API, так как сейчас используется PATCH и возвращается большой массив данных в ответе
        await sendData(deckId, cards);
        clearCards();
      },
    });
  }, [deckId, selectedCards, sendData, clearCards]);
};

export default useDeleteSelectedCards;
