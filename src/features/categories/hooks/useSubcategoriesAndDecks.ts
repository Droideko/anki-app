import { useShallow } from 'zustand/react/shallow';

import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { NormalizedCategory } from '@shared/types/category';
// import { ADD_SUBCATEGORY_ITEM } from "../constants/category";
// import { Deck } from "../types/deck";

export function useSubcategoriesAndDecks(item: NormalizedCategory) {
  const { categoriesById, decksById } = useCategoriesStore(
    useShallow((state) => ({
      categoriesById: state.categoriesById,
      decksById: state.decksById,
    })),
  );

  const subcategories = item.childIds.map((childId) => categoriesById[childId]);
  const decks = item.deckIds.map((deckId) => decksById[deckId]);

  const sliderItems = [...subcategories, ...decks].sort(
    (firstItem, secondItem) => {
      return (
        new Date(secondItem.updatedAt).getTime() -
        new Date(firstItem.updatedAt).getTime()
      );
    },
  );

  // sliderItems.push(ADD_SUBCATEGORY_ITEM);

  return sliderItems;

  // Добавляем тип элемента для дальнейшей обработки
  // TODO: скорее всего надо сделать на стороне сервера, чтобы не использовать следующий код
  // const sortedSliderItems = sliderItems.map((item) => {
  //   if ("childIds" in item) {
  //     return { type: "category", data: item };
  //   } else {
  //     return { type: "deck", data: item };
  //   }
  // });

  // return { subcategories, decks };
}
