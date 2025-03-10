import { create } from 'zustand';

import { Card } from './useCardsStore';

import { SubCategoryItemTypeWithoutAddSubcategory } from '@shared/types/category';
import { Deck } from '@shared/types/deck';

export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type CardWithFlipped = Card & { flipped: boolean };

// type ModalItem = Category | Deck | Card;
type ModalItem =
  | SubCategoryItemTypeWithoutAddSubcategory
  | Deck
  | CardWithFlipped;

interface ModalStore {
  isModalVisible: boolean;
  elementPosition: ElementPosition | null;
  selectedItem: ModalItem | null;

  showModal: (position: ElementPosition, item: ModalItem) => void;
  hideModal: () => void;
  setElementPosition: (position: ElementPosition | null) => void;

  // Delete Modal
  isDeleteModalVisible: boolean;
  showDeleteModal: (item: ModalItem | null) => void;
  hideDeleteModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isModalVisible: false,
  elementPosition: null,
  selectedItem: null,

  showModal: (position, item) =>
    set({
      isModalVisible: true,
      elementPosition: position,
      selectedItem: item,
    }),

  hideModal: () =>
    set({
      isModalVisible: false,
      elementPosition: null,
    }),

  setElementPosition: (position: ElementPosition | null) =>
    set({ elementPosition: position }),

  // Delete Modal
  isDeleteModalVisible: false,
  showDeleteModal: (item) =>
    set({ isDeleteModalVisible: true, selectedItem: item }),

  hideDeleteModal: () =>
    set({ isDeleteModalVisible: false, selectedItem: null }),
}));
