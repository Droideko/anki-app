import { create } from 'zustand';

interface SelectCardsState {
  selectedCards: number[];
  selectCard: (id: number) => void;
  selectAllCards: (ids: number[]) => void;
  clearCards: () => void;
}

export const useSelectStore = create<SelectCardsState>((set) => ({
  selectedCards: [],
  selectCard: (id: number) =>
    set((state) => ({
      selectedCards: state.selectedCards.includes(id)
        ? state.selectedCards.filter((cardId) => cardId !== id)
        : [...state.selectedCards, id],
    })),
  selectAllCards: (ids: number[]) => set({ selectedCards: ids }),
  clearCards: () => set({ selectedCards: [] }),
}));
