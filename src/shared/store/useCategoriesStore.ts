import { create } from 'zustand';
import { produce } from 'immer';

import { normalizeCategories } from '@shared/utils/normalizeCategories';
import type { NormalizedCategory, Category } from '@shared/types/category';
import type { Deck, DeckWithCardIds } from '@shared//types/deck';
import {
  addDeckToCategory,
  mergeCategories,
  mergeUnique,
  removeDeckFromCategory,
} from '@shared/utils/categoriesStoreHelpers';

type CategoriesState = {
  categoriesById: Record<number, NormalizedCategory>;
  decksById: Record<number, DeckWithCardIds>;
  rootCategoryIds: number[];
};

type CategoriesActions = {
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
  setDecks: (decks: Deck[]) => void;
  addDeck: (deck: Deck) => void;
  updateDeck: (deck: DeckWithCardIds) => void;
  deleteDeck: (id: number) => void;
};

export const useCategoriesStore = create<CategoriesState & CategoriesActions>(
  (set) => ({
    categoriesById: {},
    decksById: {},
    rootCategoryIds: [],

    setCategories: (categories) =>
      set(
        produce((state: CategoriesState) => {
          const {
            categoriesById: newCategoriesById,
            rootCategoryIds: newRootCategoryIds,
            decksById: newDecksById,
          } = normalizeCategories(categories);

          Object.keys(newCategoriesById).forEach((id) => {
            const numberId = Number(id);
            const existingCategory = state.categoriesById[numberId];
            const newCategory = newCategoriesById[numberId];

            if (existingCategory) {
              state.categoriesById[numberId] = mergeCategories(
                existingCategory,
                newCategory,
              );
            } else {
              state.categoriesById[numberId] = newCategory;
            }
          });

          state.rootCategoryIds = mergeUnique(
            state.rootCategoryIds,
            newRootCategoryIds,
          );

          state.decksById = {
            ...state.decksById,
            ...newDecksById,
          };
        }),
      ),

    addCategory: (category) =>
      set(
        produce((state: CategoriesState) => {
          const { categoriesById: newCategoriesById, decksById: newDecksById } =
            normalizeCategories([category]);

          // Объединяем новые категории и колоды с существующим состоянием
          Object.assign(state.categoriesById, newCategoriesById);
          Object.assign(state.decksById, newDecksById);

          if (!category.parentId) {
            // Если это корневая категория, добавляем ее в rootCategoryIds
            if (!state.rootCategoryIds.includes(category.id)) {
              state.rootCategoryIds.push(category.id);
            }
          } else {
            // Если это подкатегория, обновляем childIds родительской категории
            const parentCategory = state.categoriesById[category.parentId];

            if (parentCategory) {
              if (!parentCategory.childIds.includes(category.id)) {
                parentCategory.childIds.push(category.id);
              }
            } else {
              console.warn(
                `Родительская категория с id ${category.parentId} не найдена.`,
              );
            }
          }
        }),
      ),

    updateCategory: (category) =>
      set(
        produce((state: CategoriesState) => {
          const existingCategory = state.categoriesById[category.id];

          if (!existingCategory) {
            console.warn(`Категория с id ${category.id} не найдена.`);
            return;
          }

          // Проверяем, изменился ли parentId
          if (existingCategory.parentId !== category.parentId) {
            // Удаляем из childIds старого родителя
            if (existingCategory.parentId) {
              const oldParent = state.categoriesById[existingCategory.parentId];
              if (oldParent) {
                oldParent.childIds = oldParent.childIds.filter(
                  (childId) => childId !== category.id,
                );
              }
            } else {
              // Удаляем из rootCategoryIds
              state.rootCategoryIds = state.rootCategoryIds.filter(
                (id) => id !== category.id,
              );
            }

            // Добавляем в childIds нового родителя
            if (category.parentId) {
              const newParent = state.categoriesById[category.parentId];
              if (newParent) {
                if (!newParent.childIds.includes(category.id)) {
                  newParent.childIds.push(category.id);
                }
              }
            } else {
              // Добавляем в rootCategoryIds
              if (!state.rootCategoryIds.includes(category.id)) {
                state.rootCategoryIds.push(category.id);
              }
            }
          }

          // Обновляем категорию
          state.categoriesById[category.id] = {
            ...existingCategory,
            ...category,
          };

          // Обновляем колоды, если они предоставлены
          if ('decks' in category && category.decks) {
            category.decks.forEach((deck) => {
              state.decksById[deck.id] = deck;
            });
            state.categoriesById[category.id].deckIds = category.decks.map(
              (deck) => deck.id,
            );
          }
        }),
      ),

    deleteCategory: (id) =>
      set(
        produce((state: CategoriesState) => {
          const category = state.categoriesById[id];

          if (!category) {
            console.warn(`Категория с id ${id} не найдена.`);
            return;
          }

          if (category.parentId) {
            const parentCategory = state.categoriesById[category.parentId];
            if (parentCategory) {
              parentCategory.childIds = parentCategory.childIds.filter(
                (childId) => childId !== id,
              );
            }
          } else {
            state.rootCategoryIds = state.rootCategoryIds.filter(
              (rootId) => rootId !== id,
            );
          }

          // Рекурсивно удаляем подкатегории и связанные колоды
          const deleteSubcategoriesAndDecks = (categoryId: number) => {
            const subcategory = state.categoriesById[categoryId];
            if (subcategory) {
              // Удаляем связанные колоды
              if (subcategory.deckIds) {
                subcategory.deckIds.forEach((deckId) => {
                  delete state.decksById[deckId];
                });
              }

              // Рекурсивно удаляем дочерние категории
              if (subcategory.childIds && subcategory.childIds.length > 0) {
                subcategory.childIds.forEach((childId) => {
                  deleteSubcategoriesAndDecks(childId);
                });
              }

              delete state.categoriesById[categoryId];
            }
          };

          deleteSubcategoriesAndDecks(id);
        }),
      ),

    setDecks: (decks: Deck[]) =>
      set(
        produce((state: CategoriesState) => {
          decks.forEach((deck) => {
            // Обновляем или добавляем колоду в decksById
            state.decksById[deck.id] = deck;

            // Если у колоды указан categoryId, обновляем список deckIds у соответствующей категории
            if (deck.categoryId !== null) {
              const category = state.categoriesById[deck.categoryId];
              if (category) {
                if (!category.deckIds.includes(deck.id)) {
                  category.deckIds.push(deck.id);
                }
              } else {
                console.warn(`Категория с id ${deck.categoryId} не найдена.`);
              }
            }
          });
        }),
      ),

    addDeck: (deck) =>
      set(
        produce((state: CategoriesState) => {
          state.decksById[deck.id] = deck;
          // Если колода привязана к категории (categoryId !== null)
          if (deck.categoryId !== null) {
            const category = state.categoriesById[deck.categoryId];

            if (category) {
              if (!category.deckIds.includes(deck.id)) {
                category.deckIds.push(deck.id);
              }
            } else {
              console.warn(`Категория с id ${deck.categoryId} не найдена.`);
            }
          }
        }),
      ),

    updateDeck: (deck) =>
      set(
        produce((state: CategoriesState) => {
          const existingDeck = state.decksById[deck.id];

          if (!existingDeck) {
            console.warn(`Колода с id ${deck.id} не найдена.`);
            return;
          }

          // Если изменился categoryId
          if (existingDeck.categoryId !== deck.categoryId) {
            // Если у существующей колоды была категория, удаляем ее
            if (existingDeck.categoryId !== null) {
              const oldCategory = state.categoriesById[existingDeck.categoryId];
              if (oldCategory) {
                removeDeckFromCategory(oldCategory, deck.id);
              }
            }

            // Если новая колода привязана к категории, добавляем ее
            if (deck.categoryId !== null) {
              const newCategory = state.categoriesById[deck.categoryId];
              if (newCategory) {
                addDeckToCategory(newCategory, deck.id);
              } else {
                console.warn(`Категория с id ${deck.categoryId} не найдена.`);
              }
            }
          }

          // Обновляем данные колоды
          state.decksById[deck.id] = {
            ...existingDeck,
            ...deck,
          };
        }),
      ),

    deleteDeck: (id) =>
      set(
        produce((state: CategoriesState) => {
          const deck = state.decksById[id];

          if (!deck) {
            console.warn(`Колода с id ${id} не найдена.`);
            return;
          }

          // Если колода привязана к категории, удаляем ее id из deckIds этой категории
          if (deck.categoryId !== null) {
            const category = state.categoriesById[deck.categoryId];
            if (category) {
              category.deckIds = category.deckIds.filter(
                (deckId) => deckId !== id,
              );
            }
          }

          delete state.decksById[id];
        }),
      ),
  }),
);
