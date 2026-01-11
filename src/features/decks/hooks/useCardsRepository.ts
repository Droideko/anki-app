import withErrorHandling from '@features/categories/utils/withErrorHandling';
import { useProgressRepository } from '@features/review/hooks/useProgressRepository';
import { cardsService } from '@shared/api/cardsService';
import { deckService, UpdateCardDto } from '@shared/api/deckService';
import { Card, useCardsStore } from '@shared/store/useCardsStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useProgressStore } from '@shared/store/useProgressStore';

export const useCardsRepository = () => {
  const {
    cardsById,
    setCards,
    addCard,
    updateCard: updateCardInStore,
    deleteCard,
  } = useCardsStore();
  const { setProgress } = useProgressStore();

  const { decksById, updateDeck, addDeck } = useCategoriesStore();

  // const serverService = useCardsServerService();
  // const SQLiteService = useCardsSQLiteService();

  const getDeckCards = async (deckId: number): Promise<Card[]> => {
    return withErrorHandling(async () => {
      const deck = await deckService.getDeck(deckId);

      if (!deck.cards) {
        return [];
      }

      setCards(deck.cards);

      const progresses = deck.cards.map((card) => card.progress[0]);
      setProgress(progresses);

      const existingDeck = decksById[deckId];

      if (existingDeck) {
        updateDeck({
          ...existingDeck,
          cardIds: deck.cards.map((card) => card.id),
        });
      } else {
        const { cards, ...newDeck } = {
          ...deck,
          cardIds: deck.cards.map((card) => card.id),
        };

        addDeck(newDeck);
        console.warn(`Deck with id ${deckId} not found in the store`);
      }

      return deck.cards;
    });
  };

  const updateCard = async (cardId: number, data: UpdateCardDto) => {
    return withErrorHandling(async () => {
      const updatedCard = await cardsService.updateCard(cardId, data);
      updateCardInStore(updatedCard);
      return updatedCard;
    });
  };

  const updateCards = async (
    deckId: number,
    data: { cards: UpdateCardDto[] },
  ): Promise<Card[]> => {
    return withErrorHandling(async () => {
      const updatedCards = await deckService.patchDeckCards(deckId, data);
      setCards(updatedCards);

      const existingCardIds = Object.keys(cardsById).map((id) => Number(id));
      const returnedIds = updatedCards.map(({ id }) => id);

      for (const cardId of existingCardIds) {
        if (!returnedIds.includes(cardId)) {
          deleteCard(cardId);
        }
      }

      const existingDeck = decksById[deckId];
      if (existingDeck) {
        updateDeck({
          ...existingDeck,
          cardIds: updatedCards.map((card) => card.id),
        });
      } else {
        console.warn(`Deck with id ${deckId} not found in the store`);
      }

      return updatedCards;
    });
  };

  const removeCard = async (cardId: number): Promise<Card> => {
    return withErrorHandling(async () => {
      // 1. Запрос на сервер (ожидаем, что вернётся удалённая карточка или некий объект)
      const deletedCard = await cardsService.deleteCards(cardId);
      // По вашему описанию prisma.card.delete возвращает удалённый объект

      if (!deletedCard) {
        throw Error(`Сервер не вернул удалённую карточку (id: ${cardId}).`);
      }

      // 2. Удаляем карточку из cardsStore
      deleteCard(cardId);

      // 3. Удаляем id карточки из decksById[deckId].cardIds
      const deckId = deletedCard.deckId;
      const existingDeck = decksById[deckId];
      if (existingDeck) {
        updateDeck({
          ...existingDeck,
          cardIds: existingDeck.cardIds?.filter((id) => id !== cardId),
        });
      } else {
        console.warn(`Deck with id ${deckId} not found in the store`);
      }

      return deletedCard;
    });
  };

  const reverseCard = async (cardId: number): Promise<Card> => {
    const card = cardsById[cardId];

    if (!card) {
      throw new Error(`Card with id ${cardId} not found in the store`);
    }

    const reversedCard: Card = {
      ...card,
      front: card.back,
      back: card.front,
    };

    cardsService.updateCard(cardId, {
      front: reversedCard.front,
      back: reversedCard.back,
    });

    updateCardInStore(reversedCard);

    return reversedCard;
  };

  const reverseCards = async (deckId: number, ids: number[]) => {
    const cards = ids.map((id) => {
      const card = cardsById[id];
      return {
        id: card.id,
        front: card.back,
        back: card.front,
      };
    });

    return updateCards(deckId, { cards });
  };

  // // Создание карточек для колоды
  // const createCards = async (
  //   deckId: number,
  //   newCards: { front: string; back: string }[],
  // ) => {
  //   // Запрос к API на создание карточек
  //   const response = await apiService.createCards(deckId, newCards);
  //   const createdCards = response.data.cards;
  //   setCards(createdCards);
  //   return createdCards;
  // };

  // // Обновление карточки
  // const updateDeckCard = async (
  //   cardId: number,
  //   data: Partial<{ front: string; back: string }>,
  // ) => {
  //   const response = await apiService.updateCard(cardId, data);
  //   const updated = response.data;
  //   updateCard(updated);
  //   return updated;
  // };

  // // Удаление карточки
  // const removeCard = async (cardId: number) => {
  //   await apiService.deleteCard(cardId);
  //   deleteCard(cardId);
  // };

  return {
    getDeckCards,
    updateCard,
    updateCards,
    removeCard,
    reverseCard,
    reverseCards,
    // createCards,
    // updateDeckCard,
    // removeCard,
  };
};
