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

    addDeck: (deck) =>
      set(
        produce((state: CategoriesState) => {
          state.decksById[deck.id] = deck;

          const category = state.categoriesById[deck.categoryId];
          if (category) {
            if (!category.deckIds.includes(deck.id)) {
              category.deckIds.push(deck.id);
            }
          } else {
            console.warn(`Категория с id ${deck.categoryId} не найдена.`);
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

          if (existingDeck.categoryId !== deck.categoryId) {
            const oldCategory = state.categoriesById[existingDeck.categoryId];
            const newCategory = state.categoriesById[deck.categoryId];

            if (oldCategory) {
              removeDeckFromCategory(oldCategory, deck.id);
            }

            if (newCategory) {
              addDeckToCategory(newCategory, deck.id);
            }
          }

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

          const category = state.categoriesById[deck.categoryId];
          if (category) {
            category.deckIds = category.deckIds.filter(
              (deckId) => deckId !== id,
            );
          }

          delete state.decksById[id];
        }),
      ),
  }),
);

// export const useCategoriesStore = create<CategoriesState & CategoriesActions>(
//   (set) => ({
//     categoriesById: {},
//     decksById: {},
//     rootCategoryIds: [],
//     setCategories: (categories) =>
//       set((state) => {
//         const {
//           categoriesById: newCategoriesById,
//           rootCategoryIds: newRootCategoryIds,
//           decksById: newDecksById,
//         } = normalizeCategories(categories);

//         const categoriesById = { ...state.categoriesById };
//         Object.keys(newCategoriesById).forEach((id) => {
//           const numberId = Number(id);
//           const existingCategory = categoriesById[numberId];
//           const newCategory = newCategoriesById[numberId];

//           if (existingCategory) {
//             categoriesById[numberId] = {
//               ...existingCategory,
//               ...newCategory,
//               childIds: [
//                 ...new Set([
//                   ...(existingCategory.childIds || []),
//                   ...(newCategory.childIds || []),
//                 ]),
//               ],
//               deckIds: [
//                 ...new Set([
//                   ...(existingCategory.deckIds || []),
//                   ...(newCategory.deckIds || []),
//                 ]),
//               ],
//               lastFetched:
//                 newCategory.lastFetched || existingCategory.lastFetched,
//             };
//           } else {
//             categoriesById[numberId] = newCategory;
//           }
//         });

//         const rootCategoryIds = [
//           ...new Set([...state.rootCategoryIds, ...newRootCategoryIds]),
//         ];

//         const decksById = { ...state.decksById, ...newDecksById };

//         return {
//           categoriesById,
//           rootCategoryIds,
//           decksById,
//         };
//       }),
//     addCategory: (category) =>
//       set((state) => {
//         const { categoriesById: newCategoriesById, decksById: newDecksById } =
//           normalizeCategories([category]);

//         // Merge new categories and decks with existing state
//         const categoriesById = {
//           ...state.categoriesById,
//           ...newCategoriesById,
//         };

//         const decksById = { ...state.decksById, ...newDecksById };
//         let rootCategoryIds = state.rootCategoryIds;

//         if (!category.parentId) {
//           // If this is the root category, add it to rootCategoryIds
//           if (!rootCategoryIds.includes(category.id)) {
//             rootCategoryIds = [...state.rootCategoryIds, category.id];
//           }
//         } else {
//           // If it is a subcategory, update the childIds of the parent category
//           const parentCategory =
//             categoriesById[category.parentId] ||
//             state.categoriesById[category.parentId];

//           if (parentCategory) {
//             // Обновляем childIds родительской категории без дубликатов
//             const childIds = parentCategory.childIds || [];
//             if (!childIds.includes(category.id)) {
//               const updatedParentCategory = {
//                 ...parentCategory,
//                 childIds: [...childIds, category.id],
//               };

//               // Update childIds of parent category without duplicates
//               categoriesById[category.parentId] = updatedParentCategory;
//             }
//           } else {
//             console.warn(
//               `Parent category with id ${category.parentId} hasn't found.`,
//             );
//           }
//         }

//         return {
//           categoriesById,
//           decksById,
//           rootCategoryIds,
//         };
//       }),
//     updateCategory: (category) =>
//       set((state) => {
//         const existingCategory = state.categoriesById[category.id];
//         const categoriesById = { ...state.categoriesById };
//         const decksById = { ...state.decksById };
//         let rootCategoryIds = state.rootCategoryIds;

//         if (!existingCategory) {
//           console.warn(`Category with id ${category.id} hasn't found.`);
//           return {};
//         }

//         // Check if parentId has changed
//         if (existingCategory.parentId !== category.parentId) {
//           // Remove the old parent from childIds
//           if (existingCategory.parentId) {
//             const oldParent = categoriesById[existingCategory.parentId];
//             if (oldParent) {
//               oldParent.childIds = oldParent.childIds.filter(
//                 (childId) => childId !== category.id,
//               );
//               categoriesById[existingCategory.parentId] = oldParent;
//             }
//           } else {
//             // Remove from rootCategoryIds
//             rootCategoryIds = rootCategoryIds.filter(
//               (id) => id !== category.id,
//             );
//           }
//           // Add a new parent to childIds
//           if (category.parentId) {
//             const newParent = categoriesById[category.parentId];
//             if (newParent) {
//               if (!newParent.childIds.includes(category.id)) {
//                 newParent.childIds = [...newParent.childIds, category.id];
//                 categoriesById[category.parentId] = newParent;
//               }
//             } else {
//               console.warn(
//                 `New Parent with id ${category.parentId} hasn't found.`,
//               );
//             }
//           } else {
//             if (!rootCategoryIds.includes(category.id)) {
//               rootCategoryIds = [...rootCategoryIds, category.id];
//             }
//           }
//         }

//         const updatedCategory: NormalizedCategory = {
//           ...existingCategory,
//           ...category,
//         };

//         // If a category has updated decks, update them
//         if ('decks' in category && category.decks) {
//           category.decks.forEach((deck) => {
//             decksById[deck.id] = deck;
//           });
//           updatedCategory.deckIds = category.decks.map((deck) => deck.id);
//         }

//         categoriesById[category.id] = updatedCategory;

//         return { categoriesById, decksById, rootCategoryIds };
//       }),
//     deleteCategory: (id) =>
//       set((state) => {
//         const categoriesById = { ...state.categoriesById };
//         const decksById = { ...state.decksById };
//         let rootCategoryIds = state.rootCategoryIds;

//         const category = categoriesById[id];

//         if (!category) {
//           console.warn(`Category with id ${id} hasn't found.`);
//           return {};
//         }

//         if (category.parentId) {
//           const parentCategory = categoriesById[category.parentId];
//           if (parentCategory) {
//             parentCategory.childIds = parentCategory.childIds.filter(
//               (childId) => childId !== id,
//             );
//             categoriesById[category.parentId] = parentCategory;
//           }
//         } else {
//           rootCategoryIds = rootCategoryIds.filter((rootId) => rootId !== id);
//         }

//         // Recursively remove subcategories and related decks
//         const deleteSubcategoriesAndDecks = (categoryId: number) => {
//           const subcategory = categoriesById[categoryId];
//           if (subcategory) {
//             if (subcategory.deckIds) {
//               subcategory.deckIds.forEach((deckId) => {
//                 delete decksById[deckId];
//               });
//             }

//             if (subcategory.childIds && subcategory.childIds.length > 0) {
//               subcategory.childIds.forEach((childId) => {
//                 deleteSubcategoriesAndDecks(childId);
//               });
//             }

//             delete categoriesById[categoryId];
//           }
//         };

//         deleteSubcategoriesAndDecks(id);

//         return { categoriesById, decksById, rootCategoryIds };
//       }),

//     addDeck: (deck) =>
//       set((state) => {
//         const decksById = {
//           ...state.decksById,
//           [deck.id]: deck,
//         };

//         const categoriesById = { ...state.categoriesById };
//         const category = categoriesById[deck.categoryId];
//         if (category) {
//           if (!category.deckIds.includes(deck.id)) {
//             category.deckIds = [...category.deckIds, deck.id];
//             categoriesById[deck.categoryId] = category;
//           }
//         } else {
//           console.warn(
//             `The category with id ${deck.categoryId} was not found.`,
//           );
//         }

//         return { decksById, categoriesById };
//       }),

//     updateDeck: (deck) =>
//       set((state) => {
//         const existingDeck = state.decksById[deck.id];
//         const decksById = { ...state.decksById };
//         const categoriesById = { ...state.categoriesById };

//         if (!existingDeck) {
//           console.warn(`Deck with id ${deck.id} was not found.`);
//           return {};
//         }

//         // whether categoryId has changed
//         if (existingDeck.categoryId !== deck.categoryId) {
//           // Remove deckId from old category
//           const oldCategory = categoriesById[existingDeck.categoryId];
//           if (oldCategory) {
//             oldCategory.deckIds = oldCategory.deckIds.filter(
//               (deckId) => deckId !== deck.id,
//             );
//             categoriesById[existingDeck.categoryId] = oldCategory;
//           }

//           // Add deckId to a new category
//           const newCategory = categoriesById[deck.categoryId];
//           if (newCategory) {
//             if (!newCategory.deckIds.includes(deck.id)) {
//               newCategory.deckIds = [...newCategory.deckIds, deck.id];
//               categoriesById[deck.categoryId] = newCategory;
//             }
//           } else {
//             console.warn(
//               `The category with id ${deck.categoryId} was not found.`,
//             );
//           }
//         }

//         decksById[deck.id] = {
//           ...existingDeck,
//           ...deck,
//         };

//         return { decksById, categoriesById };
//       }),

//     deleteDeck: (id) =>
//       set((state) => {
//         const decksById = { ...state.decksById };
//         const categoriesById = { ...state.categoriesById };
//         const deck = decksById[id];

//         if (!deck) {
//           console.warn(`Deck with id ${id} was not found.`);
//           return {};
//         }

//         const category = categoriesById[deck.categoryId];
//         if (category) {
//           category.deckIds = category.deckIds.filter((deckId) => deckId !== id);
//           categoriesById[deck.categoryId] = category;
//         }

//         delete decksById[id];

//         return { decksById, categoriesById };
//       }),
//   }),
// );
