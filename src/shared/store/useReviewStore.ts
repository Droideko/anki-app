import { create } from 'zustand';

interface ReviewCardChange {
  front: string;
  back: string;
  isReversed: boolean;
  isDeleted: boolean;
  // В будущем можно добавить, например, tag?: string;
}

interface ReviewStore {
  currentCardId: string | null;
  setCurrentCardId: (id: string) => void;

  changedCards: Record<string, ReviewCardChange>;
  setChangedCard: (cardId: string, updates: Partial<ReviewCardChange>) => void;
  resetChangedCard: (cardId: string) => void;
}

export const useReviewStore = create<ReviewStore>((set) => ({
  currentCardId: null,
  setCurrentCardId: (id: string) => set({ currentCardId: id }),

  changedCards: {},
  setChangedCard: (cardId: string, updates: Partial<ReviewCardChange>) =>
    set((state) => ({
      changedCards: {
        ...state.changedCards,
        [cardId]: {
          front: state.changedCards[cardId]?.front ?? '',
          back: state.changedCards[cardId]?.back ?? '',
          isReversed: state.changedCards[cardId]?.isReversed ?? false,
          isDeleted: state.changedCards[cardId]?.isDeleted ?? false,
          ...updates,
        },
      },
    })),
  resetChangedCard: (cardId: string) =>
    set((state) => {
      const { [cardId]: _, ...rest } = state.changedCards;
      return { changedCards: rest };
    }),
}));
