import { create } from 'zustand';

import { Progress } from './useProgressStore';

export interface Card {
  type: 'CARD';
  id: number;
  front: string;
  back: string;
  deckId: number;
  createdAt: string;
  updatedAt: string;
  tagIds: number[];
  progress: Progress[];
}

interface CardsState {
  cardsById: Record<number, Card>;
}

interface CardsActions {
  setCards: (cards: Card[]) => void;
  addCard: (card: Card) => void;
  updateCard: (card: Card) => void;
  deleteCard: (id: number) => void;
}

export const useCardsStore = create<CardsState & CardsActions>((set) => ({
  cardsById: {},
  setCards: (cards) =>
    set(({ cardsById }) => {
      const newCardsById = { ...cardsById };
      for (const card of cards) {
        newCardsById[card.id] = card;
      }
      return { cardsById: newCardsById };
    }),
  addCard: (card) =>
    set((state) => ({
      cardsById: { ...state.cardsById, [card.id]: card },
    })),
  updateCard: (card) =>
    set((state) => ({
      cardsById: { ...state.cardsById, [card.id]: card },
    })),
  deleteCard: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.cardsById;
      return { cardsById: rest };
    }),
}));
