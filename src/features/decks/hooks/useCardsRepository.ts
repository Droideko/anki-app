import withErrorHandling from '@features/categories/utils/withErrorHandling';
import { cardsService } from '@shared/api/cardsService';
import { deckService, UpdateCardDto } from '@shared/api/deckService';
import { Card, useCardsStore } from '@shared/store/useCardsStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';

export const useCardsRepository = () => {
  const { cardsById, setCards, addCard, updateCard, deleteCard } =
    useCardsStore();

  const { decksById, updateDeck } = useCategoriesStore();

  // const serverService = useCardsServerService();
  // const SQLiteService = useCardsSQLiteService();

  // Получение карточек конкретной колоды
  // const getDeckCards = async (deckId: number) => {
  //   const deck = await deckService.getDeck(deckId);
  //   if (!deck.cards) return [];
  //   setCards(deck.cards);
  //   return deck.cards;
  // };

  const getDeckCards = async (deckId: number): Promise<Card[]> => {
    return withErrorHandling(async () => {
      const deck = await deckService.getDeck(deckId);

      if (!deck.cards) {
        return [];
      }

      setCards(deck.cards);

      const existingDeck = decksById[deckId];
      if (existingDeck) {
        updateDeck({
          ...existingDeck,
          cardIds: deck.cards.map((card) => card.id),
        });
      } else {
        console.warn(`Deck with id ${deckId} not found in the store`);
      }

      return deck.cards;
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

  // const updateCards = async (
  //   deckId: number,
  //   data: { cards: UpdateCardDto[] },
  // ): Promise<Card[]> => {
  //   return withErrorHandling(async () => {
  //     const updatedCards = await deckService.patchDeckCards(deckId, data);

  //     console.log('updatedCards', updatedCards);

  //     // update cards in store
  //     setCards(updatedCards);

  //     // 2. Удаляем из стора те карточки, которых нет в updatedCards
  //     //    (предполагаем, что если карточки нет в списке, значит она была удалена)
  //     // const existingCardIds = Object.keys(cardsById).map((id) => Number(id));
  //     // const returnedIds = updatedCards.map(({ id }) => id);

  //     // for (const cardId of existingCardIds) {
  //     //   if (!returnedIds.includes(cardId)) {
  //     //     deleteCard(cardId);
  //     //   }
  //     // }

  //     return updatedCards;
  //   });
  // };

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
    updateCards,
    removeCard,
    // createCards,
    // updateDeckCard,
    // removeCard,
  };
};
