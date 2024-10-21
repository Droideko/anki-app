import { create } from "zustand";
import { SubCategoryItemTypeWithoutAddSubcategory } from "@/src/features/categories/types";

export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ModalStore {
  isModalVisible: boolean;
  elementPosition: ElementPosition | null;
  showModal: (
    position: ElementPosition,
    item: SubCategoryItemTypeWithoutAddSubcategory
  ) => void;
  hideModal: () => void;
  setElementPosition: (position: ElementPosition | null) => void;
  selectedCategory: null | SubCategoryItemTypeWithoutAddSubcategory;

  // Delete Modal
  isDeleteModalVisible: boolean;
  showDeleteModal: (
    item: null | SubCategoryItemTypeWithoutAddSubcategory
  ) => void;
  hideDeleteModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isModalVisible: false,
  elementPosition: null,
  selectedCategory: null,
  showModal: (position, item) =>
    set({
      isModalVisible: true,
      elementPosition: position,
      selectedCategory: item,
    }),
  hideModal: () =>
    set({
      isModalVisible: false,
      elementPosition: null,
      // selectedCategory: null,
    }),
  setElementPosition: (position: ElementPosition | null) =>
    set({ elementPosition: position }),

  // Delete Modal
  isDeleteModalVisible: false,
  showDeleteModal: (item) =>
    set({ isDeleteModalVisible: true, selectedCategory: item }),
  hideDeleteModal: () =>
    set({ isDeleteModalVisible: false, selectedCategory: null }),
}));
