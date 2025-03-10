import { useCallback } from 'react';

import { useCardsRepository } from './useCardsRepository';

import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { UpdateCardDto } from '@shared/api/deckService';
import showAlert from '@shared/utils/showAlert';
import { useSelectStore } from '@shared/store/useSelectStore';

const useDeleteSelectedCards = (deckId: number) => {
  const { updateCards } = useCardsRepository();
  const { selectedCards } = useSelectStore();

  const [{ loading }, sendData] = useAsyncFn(
    async (deckId: number, cards: UpdateCardDto[]) => {
      return updateCards(deckId, { cards });
    },
    [],
  );

  return useCallback(() => {
    showAlert({
      alertTitle: 'Delete selected Cards?',
      alertMessage: 'This action cannot be undone.',
      onConfirm: () => {
        console.log(selectedCards);
      },
    });
  }, [selectedCards]);
};

export default useDeleteSelectedCards;
