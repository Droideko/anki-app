import { create } from 'zustand';

import { normalizeCategories } from '@shared/utils/normalizeCategories';
import type { NormalizedCategory, Category } from '@shared/types/category';
import type { Deck } from '@shared//types/deck';

interface CategoriesState {
  categoriesById: Record<number, NormalizedCategory>;
  decksById: Record<number, Deck>;
  rootCategoryIds: number[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategoryInStore: (category: Category) => void;
  deleteCategoryFromStore: (id: number) => void;
  addDeck: (deck: Deck) => void;
  updateDeckInStore: (deck: Deck) => void;
  deleteDeckFromStore: (id: number) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categoriesById: {},
  decksById: {},
  rootCategoryIds: [],
  setCategories: (categories) =>
    set((state) => {
      const {
        categoriesById: newCategoriesById,
        rootCategoryIds: newRootCategoryIds,
        decksById: newDecksById,
      } = normalizeCategories(categories);

      const categoriesById = { ...state.categoriesById };
      Object.keys(newCategoriesById).forEach((id) => {
        const numberId = Number(id);
        const existingCategory = categoriesById[numberId];
        const newCategory = newCategoriesById[numberId];

        if (existingCategory) {
          categoriesById[numberId] = {
            ...existingCategory,
            ...newCategory,
            childIds: [
              ...new Set([
                ...(existingCategory.childIds || []),
                ...(newCategory.childIds || []),
              ]),
            ],
            deckIds: [
              ...new Set([
                ...(existingCategory.deckIds || []),
                ...(newCategory.deckIds || []),
              ]),
            ],
          };
        } else {
          categoriesById[numberId] = newCategory;
        }
      });

      const rootCategoryIds = [
        ...new Set([...state.rootCategoryIds, ...newRootCategoryIds]),
      ];

      const decksById = { ...state.decksById, ...newDecksById };

      return {
        categoriesById,
        rootCategoryIds,
        decksById,
      };
    }),
  addCategory: (category) =>
    set((state) => {
      const {
        categoriesById: newCategoriesById,
        decksById: newDecksById,
        rootCategoryIds: newRootCategoryIds,
      } = normalizeCategories([category]);

      // Merge new categories and decks with existing state
      const categoriesById = { ...state.categoriesById, ...newCategoriesById };
      const decksById = { ...state.decksById, ...newDecksById };

      let rootCategoryIds = state.rootCategoryIds;

      if (!category.parentId) {
        // If this is the root category, add it to rootCategoryIds
        if (!rootCategoryIds.includes(category.id)) {
          rootCategoryIds = [...state.rootCategoryIds, category.id];
        }
      } else {
        // If it is a subcategory, update the childIds of the parent category
        const parentCategory =
          categoriesById[category.parentId] ||
          state.categoriesById[category.parentId];

        if (parentCategory) {
          // Обновляем childIds родительской категории без дубликатов
          const childIds = parentCategory.childIds || [];
          if (!childIds.includes(category.id)) {
            const updatedParentCategory = {
              ...parentCategory,
              childIds: [...childIds, category.id],
            };

            // Update childIds of parent category without duplicates
            categoriesById[category.parentId] = updatedParentCategory;
          }
        } else {
          console.warn(
            `Parent category with id ${category.parentId} hasn't found.`,
          );
        }
      }

      return {
        categoriesById,
        decksById,
        rootCategoryIds,
      };
    }),
  updateCategoryInStore: (category) =>
    set((state) => {
      const existingCategory = state.categoriesById[category.id];
      const categoriesById = { ...state.categoriesById };
      const decksById = { ...state.decksById };
      let rootCategoryIds = state.rootCategoryIds;

      if (!existingCategory) {
        console.warn(`Category with id ${category.id} hasn't found.`);
        return {};
      }

      // Check if parentId has changed
      if (existingCategory.parentId !== category.parentId) {
        // Remove the old parent from childIds
        if (existingCategory.parentId) {
          const oldParent = categoriesById[existingCategory.parentId];
          if (oldParent) {
            oldParent.childIds = oldParent.childIds.filter(
              (childId) => childId !== category.id,
            );
            categoriesById[existingCategory.parentId] = oldParent;
          }
        } else {
          // Remove from rootCategoryIds
          rootCategoryIds = rootCategoryIds.filter((id) => id !== category.id);
        }
        // Add a new parent to childIds
        if (category.parentId) {
          const newParent = categoriesById[category.parentId];
          if (newParent) {
            if (!newParent.childIds.includes(category.id)) {
              newParent.childIds = [...newParent.childIds, category.id];
              categoriesById[category.parentId] = newParent;
            }
          } else {
            console.warn(
              `New Parent with id ${category.parentId} hasn't found.`,
            );
          }
        } else {
          if (!rootCategoryIds.includes(category.id)) {
            rootCategoryIds = [...rootCategoryIds, category.id];
          }
        }
      }

      const updatedCategory: NormalizedCategory = {
        ...existingCategory,
        ...category,
      };

      // If a category has updated decks, update them
      if ('decks' in category && category.decks) {
        category.decks.forEach((deck) => {
          decksById[deck.id] = deck;
        });
        updatedCategory.deckIds = category.decks.map((deck) => deck.id);
      }

      categoriesById[category.id] = updatedCategory;

      return { categoriesById, decksById, rootCategoryIds };
    }),
  deleteCategoryFromStore: (id) =>
    set((state) => {
      const categoriesById = { ...state.categoriesById };
      const decksById = { ...state.decksById };
      let rootCategoryIds = state.rootCategoryIds;

      const category = categoriesById[id];

      if (!category) {
        console.warn(`Category with id ${id} hasn't found.`);
        return {};
      }

      if (category.parentId) {
        const parentCategory = categoriesById[category.parentId];
        if (parentCategory) {
          parentCategory.childIds = parentCategory.childIds.filter(
            (childId) => childId !== id,
          );
          categoriesById[category.parentId] = parentCategory;
        }
      } else {
        rootCategoryIds = rootCategoryIds.filter((rootId) => rootId !== id);
      }

      // Recursively remove subcategories and related decks
      const deleteSubcategoriesAndDecks = (categoryId: number) => {
        const subcategory = categoriesById[categoryId];
        if (subcategory) {
          if (subcategory.deckIds) {
            subcategory.deckIds.forEach((deckId) => {
              delete decksById[deckId];
            });
          }

          if (subcategory.childIds && subcategory.childIds.length > 0) {
            subcategory.childIds.forEach((childId) => {
              deleteSubcategoriesAndDecks(childId);
            });
          }

          delete categoriesById[categoryId];
        }
      };

      deleteSubcategoriesAndDecks(id);

      return { categoriesById, decksById, rootCategoryIds };
    }),

  addDeck: (deck) =>
    set((state) => {
      const decksById = {
        ...state.decksById,
        [deck.id]: deck,
      };

      const categoriesById = { ...state.categoriesById };
      const category = categoriesById[deck.categoryId];
      if (category) {
        if (!category.deckIds.includes(deck.id)) {
          category.deckIds = [...category.deckIds, deck.id];
          categoriesById[deck.categoryId] = category;
        }
      } else {
        console.warn(`The category with id ${deck.categoryId} was not found.`);
      }

      return { decksById, categoriesById };
    }),

  updateDeckInStore: (deck) =>
    set((state) => {
      const existingDeck = state.decksById[deck.id];
      const decksById = { ...state.decksById };
      const categoriesById = { ...state.categoriesById };

      if (!existingDeck) {
        console.warn(`Deck with id ${deck.id} was not found.`);
        return {};
      }

      // whether categoryId has changed
      if (existingDeck.categoryId !== deck.categoryId) {
        // Remove deckId from old category
        const oldCategory = categoriesById[existingDeck.categoryId];
        if (oldCategory) {
          oldCategory.deckIds = oldCategory.deckIds.filter(
            (deckId) => deckId !== deck.id,
          );
          categoriesById[existingDeck.categoryId] = oldCategory;
        }

        // Add deckId to a new category
        const newCategory = categoriesById[deck.categoryId];
        if (newCategory) {
          if (!newCategory.deckIds.includes(deck.id)) {
            newCategory.deckIds = [...newCategory.deckIds, deck.id];
            categoriesById[deck.categoryId] = newCategory;
          }
        } else {
          console.warn(
            `The category with id ${deck.categoryId} was not found.`,
          );
        }
      }

      decksById[deck.id] = {
        ...existingDeck,
        ...deck,
      };

      return { decksById, categoriesById };
    }),

  deleteDeckFromStore: (id) =>
    set((state) => {
      const decksById = { ...state.decksById };
      const categoriesById = { ...state.categoriesById };
      const deck = decksById[id];

      if (!deck) {
        console.warn(`Deck with id ${id} was not found.`);
        return {};
      }

      const category = categoriesById[deck.categoryId];
      if (category) {
        category.deckIds = category.deckIds.filter((deckId) => deckId !== id);
        categoriesById[deck.categoryId] = category;
      }

      delete decksById[id];

      return { decksById, categoriesById };
    }),
}));
