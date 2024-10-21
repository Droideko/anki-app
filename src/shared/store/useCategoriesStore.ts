import { create } from "zustand";
import {
  normalizeCategories,
  NormalizedCategory,
} from "@/src/features/categories/utils/normalizeCategories";
import { Deck } from "../types/deck";
import { Categories, Category } from "@/src/features/categories/types";

interface CategoriesState {
  categoriesById: Record<number, NormalizedCategory>;
  decksById: Record<number, Deck>;
  rootCategoryIds: number[];
  setCategories: (categories: Categories) => void;
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

      // Объединяем categoriesById аккуратно
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

      // Объединяем rootCategoryIds без дубликатов
      const rootCategoryIds = [
        ...new Set([...state.rootCategoryIds, ...newRootCategoryIds]),
      ];

      // Объединяем decksById
      const decksById = { ...state.decksById, ...newDecksById };

      return {
        categoriesById,
        rootCategoryIds,
        decksById,
      };
    }),
  addCategory: (category) =>
    set((state) => {
      // Нормализуем категорию и её подкатегории
      const {
        categoriesById: newCategoriesById,
        decksById: newDecksById,
        rootCategoryIds: newRootCategoryIds,
      } = normalizeCategories([category]);

      // Объединяем новые категории и колоды с существующим состоянием
      const categoriesById = { ...state.categoriesById, ...newCategoriesById };
      const decksById = { ...state.decksById, ...newDecksById };

      let rootCategoryIds = state.rootCategoryIds;

      if (!category.parentId) {
        // Если это корневая категория, добавляем её в rootCategoryIds
        if (!rootCategoryIds.includes(category.id)) {
          rootCategoryIds = [...state.rootCategoryIds, category.id];
        }
      } else {
        // Если это подкатегория, обновляем childIds родительской категории
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

            // Обновляем categoriesById с обновлённой родительской категорией
            categoriesById[category.parentId] = updatedParentCategory;
          }
        } else {
          console.warn(
            `Parent category with id ${category.parentId} hasn't found.`
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

      // Проверяем, изменился ли parentId
      if (existingCategory.parentId !== category.parentId) {
        // Удаляем из childIds старого родителя
        if (existingCategory.parentId) {
          const oldParent = categoriesById[existingCategory.parentId];
          if (oldParent) {
            oldParent.childIds = oldParent.childIds.filter(
              (childId) => childId !== category.id
            );
            categoriesById[existingCategory.parentId] = oldParent;
          }
        } else {
          // Удаляем из rootCategoryIds
          rootCategoryIds = rootCategoryIds.filter((id) => id !== category.id);
        }

        // Добавляем в childIds нового родителя
        if (category.parentId) {
          const newParent = categoriesById[category.parentId];
          if (newParent) {
            if (!newParent.childIds.includes(category.id)) {
              newParent.childIds = [...newParent.childIds, category.id];
              categoriesById[category.parentId] = newParent;
            }
          } else {
            console.warn(
              `New Parent with id ${category.parentId} hasn't found.`
            );
          }
        } else {
          // Добавляем в rootCategoryIds
          if (!rootCategoryIds.includes(category.id)) {
            rootCategoryIds = [...rootCategoryIds, category.id];
          }
        }
      }

      // Обновляем свойства категории
      const updatedCategory: NormalizedCategory = {
        ...existingCategory,
        ...category,
      };

      // Если у категории есть обновлённые колоды, обновляем их
      if ("decks" in category && category.decks) {
        // Добавляем или обновляем колоды
        category.decks.forEach((deck) => {
          decksById[deck.id] = deck;
        });

        // Обновляем deckIds в категории
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
        // Обновляем родительскую категорию
        const parentCategory = categoriesById[category.parentId];
        if (parentCategory) {
          parentCategory.childIds = parentCategory.childIds.filter(
            (childId) => childId !== id
          );
          categoriesById[category.parentId] = parentCategory;
        }
      } else {
        // Удаляем из корневых категорий
        rootCategoryIds = rootCategoryIds.filter((rootId) => rootId !== id);
      }

      // Рекурсивно удаляем подкатегории и связанные колоды
      const deleteSubcategoriesAndDecks = (categoryId: number) => {
        const subcategory = categoriesById[categoryId];
        if (subcategory) {
          // Удаляем связанные колоды
          if (subcategory.deckIds) {
            subcategory.deckIds.forEach((deckId) => {
              delete decksById[deckId];
            });
          }

          // Рекурсивно удаляем подкатегории
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
        // Обновляем deckIds категории без дубликатов
        if (!category.deckIds.includes(deck.id)) {
          category.deckIds = [...category.deckIds, deck.id];
          categoriesById[deck.categoryId] = category;
        }
      } else {
        console.warn(`Категория с id ${deck.categoryId} не найдена.`);
      }

      return { decksById, categoriesById };
    }),

  updateDeckInStore: (deck) =>
    set((state) => {
      const existingDeck = state.decksById[deck.id];
      const decksById = { ...state.decksById };
      const categoriesById = { ...state.categoriesById };

      if (!existingDeck) {
        console.warn(`Колода с id ${deck.id} не найдена.`);
        return {};
      }

      // Проверяем, изменился ли categoryId
      if (existingDeck.categoryId !== deck.categoryId) {
        // Удаляем deckId из старой категории
        const oldCategory = categoriesById[existingDeck.categoryId];
        if (oldCategory) {
          oldCategory.deckIds = oldCategory.deckIds.filter(
            (deckId) => deckId !== deck.id
          );
          categoriesById[existingDeck.categoryId] = oldCategory;
        }

        // Добавляем deckId в новую категорию
        const newCategory = categoriesById[deck.categoryId];
        if (newCategory) {
          if (!newCategory.deckIds.includes(deck.id)) {
            newCategory.deckIds = [...newCategory.deckIds, deck.id];
            categoriesById[deck.categoryId] = newCategory;
          }
        } else {
          console.warn(`Категория с id ${deck.categoryId} не найдена.`);
        }
      }

      // Обновляем свойства колоды
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
        console.warn(`Колода с id ${id} не найдена.`);
        return {};
      }

      // Удаляем deckId из категории
      const category = categoriesById[deck.categoryId];
      if (category) {
        category.deckIds = category.deckIds.filter((deckId) => deckId !== id);
        categoriesById[deck.categoryId] = category;
      }

      delete decksById[id];

      return { decksById, categoriesById };
    }),
}));
