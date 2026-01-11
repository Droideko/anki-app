import { NormalizedCategory } from '@shared/types/category';

export const mergeUnique = <T>(
  array1: Array<T> = [],
  array2: Array<T> = [],
) => [...new Set([...array1, ...array2])];

export const addDeckToCategory = (
  category: NormalizedCategory,
  deckId: number,
) => {
  if (!category.deckIds.includes(deckId)) {
    category.deckIds.push(deckId);
  }
};

export const removeDeckFromCategory = (
  category: NormalizedCategory,
  deckId: number,
) => {
  category.deckIds = category.deckIds.filter((id) => id !== deckId);
};

export const mergeCategories = (
  existingCategory: NormalizedCategory,
  newCategory: NormalizedCategory,
) => ({
  ...existingCategory,
  ...newCategory,
  childIds: mergeUnique(existingCategory.childIds, newCategory.childIds),
  deckIds: mergeUnique(existingCategory.deckIds, newCategory.deckIds),
  lastFetched: newCategory.lastFetched ?? existingCategory.lastFetched,
});
