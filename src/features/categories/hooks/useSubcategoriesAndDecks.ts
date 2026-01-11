import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import sortByUpdatedAtDesc from '../utils/sortByUpdatedAtDesc';

import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import {
  NormalizedCategory,
  SubCategoryItemType,
} from '@shared/types/category';
import { ADD_SUBCATEGORY_ITEM } from '@shared/constants/category';

export function useSubcategoriesAndDecks(
  item: NormalizedCategory,
): SubCategoryItemType[] {
  const { categoriesById, decksById } = useCategoriesStore(
    useShallow((state) => ({
      categoriesById: state.categoriesById,
      decksById: state.decksById,
    })),
  );

  return useMemo(() => {
    const subcategories = item.childIds.map((id) => categoriesById[id]);
    const decks = item.deckIds.map((id) => decksById[id]);

    const sliderItems = [...subcategories, ...decks].sort(sortByUpdatedAtDesc);
    (sliderItems as SubCategoryItemType[]).push(ADD_SUBCATEGORY_ITEM);

    return sliderItems;
  }, [categoriesById, decksById, item]);
}
