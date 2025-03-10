import { create } from 'zustand';

// type ModalItem = Category | Deck | Card;
interface ModalStore {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

export const useModalCategoryStore = create<ModalStore>((set) => ({
  isVisible: false,

  showModal: () => set({ isVisible: true }),
  hideModal: () => set({ isVisible: false }),
}));
