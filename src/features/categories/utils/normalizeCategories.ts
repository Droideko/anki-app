import { Deck } from "../../../shared/types/deck";
import { Categories, Category } from "../types";

export type NormalizedCategory = Omit<Category, "subcategories" | "decks"> & {
  childIds: number[];
  deckIds: number[];
};

export interface NormalizedCategories {
  categoriesById: Record<number, NormalizedCategory>;
  decksById: Record<number, Deck>;
  rootCategoryIds: number[];
}

export const normalizeCategories = (
  categories: Categories,
  existingCategoriesById: Record<number, NormalizedCategory> = {}
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
      // Объединяем существующую категорию с новой
      categoriesById[category.id] = {
        ...existingCategory,
        ...categoryWithoutChildren,
        childIds: Array.from(
          new Set([...(existingCategory.childIds || []), ...childIds])
        ),
        deckIds: Array.from(
          new Set([...(existingCategory.deckIds || []), ...deckIds])
        ),
      };
    } else {
      categoriesById[category.id] = {
        ...categoryWithoutChildren,
        childIds,
        deckIds,
      };
    }

    // Добавляем колоды в decksById
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
        categoriesById
      );
      Object.assign(categoriesById, subCategoriesData.categoriesById);
      Object.assign(decksById, subCategoriesData.decksById);
      // Не объединяем rootCategoryIds, так как подкатегории не являются корневыми
    }
  });

  return { categoriesById, decksById, rootCategoryIds };
};

// export const normalizeCategories = (
//   categories: Categories
// ): NormalizedCategories => {
//   const categoriesById: Record<number, NormalizedCategory> = {};
//   const decksById: Record<number, Deck> = {};
//   const rootCategoryIds: number[] = [];

//   categories.forEach((category) => {
//     const childIds = category.subcategories
//       ? category.subcategories.map((sub) => sub.id)
//       : [];

//     const deckIds = category.decks ? category.decks.map((deck) => deck.id) : [];

//     const { subcategories, decks, ...categoryWithoutChildren } = category;

//     categoriesById[category.id] = {
//       ...categoryWithoutChildren,
//       childIds,
//       deckIds,
//     };

//     // Добавляем колоды в decksById
//     if (decks) {
//       decks.forEach((deck) => {
//         decksById[deck.id] = deck;
//       });
//     }

//     if (!category.parentId) {
//       rootCategoryIds.push(category.id);
//     }

//     if (subcategories && subcategories.length > 0) {
//       const subCategoriesData = normalizeCategories(subcategories);
//       Object.assign(categoriesById, subCategoriesData.categoriesById);
//       Object.assign(decksById, subCategoriesData.decksById);
//       // Не объединяем rootCategoryIds, так как подкатегории не являются корневыми
//     }
//   });

//   return { categoriesById, decksById, rootCategoryIds };
// };
