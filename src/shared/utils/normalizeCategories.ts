import {
  Category,
  NormalizedCategories,
  NormalizedCategory,
} from '@shared/types/category';
import { Deck } from '@shared/types/deck';

export const normalizeCategories = (
  categories: Category[],
  existingCategoriesById: Record<number, NormalizedCategory> = {},
): NormalizedCategories => {
  const categoriesById: Record<number, NormalizedCategory> = {
    ...existingCategoriesById,
  };
  const decksById: Record<number, Deck> = {};
  const rootCategoryIds: number[] = [];

  categories.forEach((category) => {
    const childIds = category.subcategories
      ? category.subcategories.map((sub) => sub.id)
      : [];

    const deckIds = category.decks ? category.decks.map((deck) => deck.id) : [];

    const { subcategories, decks, ...categoryWithoutChildren } = category;

    const existingCategory = categoriesById[category.id];

    if (existingCategory) {
      // Merge the existing category with the new one
      categoriesById[category.id] = {
        ...existingCategory,
        ...categoryWithoutChildren,
        childIds: Array.from(
          new Set([...(existingCategory.childIds || []), ...childIds]),
        ),
        deckIds: Array.from(
          new Set([...(existingCategory.deckIds || []), ...deckIds]),
        ),
      };
    } else {
      categoriesById[category.id] = {
        ...categoryWithoutChildren,
        childIds,
        deckIds,
      };
    }

    // Add decks to decksById
    if (decks) {
      decks.forEach((deck) => {
        decksById[deck.id] = deck;
      });
    }

    if (!category.parentId) {
      rootCategoryIds.push(category.id);
    }

    if (subcategories && subcategories.length > 0) {
      const subCategoriesData = normalizeCategories(
        subcategories,
        categoriesById,
      );
      Object.assign(categoriesById, subCategoriesData.categoriesById);
      Object.assign(decksById, subCategoriesData.decksById);
    }
  });

  return { categoriesById, decksById, rootCategoryIds };
};
