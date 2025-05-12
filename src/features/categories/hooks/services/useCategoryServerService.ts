import {
  CategoryFormData,
  CategoryWithoutSubcategories,
} from '@features/categories/types';
import withErrorHandling from '@features/categories/utils/withErrorHandling';
import { categoryService } from '@features/categories/services/api/categoryService';
import saveCategoryToSQLite from '@features/categories/services/sqlite/saveCategoryToSQLite';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import deleteCategoryFromSQLite from '@features/categories/services/sqlite/deleteCategoryFromSQLite';
import { Category } from '@shared/types/category';
import useGetSQLiteContext from '@shared/utils/isWeb/useGetSQLiteContext';
import { deckService, UpdateCardDto } from '@shared/api/deckService';
import { Deck, DeckFormData } from '@shared/types/deck';
import saveDeckToSQLite from '@shared/db/deck/saveDeckToSQLite';
import deleteDeckFromSQLite from '@features/decks/services/deleteDeckFromSQLite';
import { Card } from '@shared/store/useCardsStore';

const useCategoryServerService = () => {
  const db = useGetSQLiteContext();

  const {
    addCategory,
    setCategories,
    deleteCategory: deleteCategoryFromStore,
    updateCategory: updateCategoryInStore,
    addDeck,
    setDecks,
    deleteDeck: deleteDeckFromStore,
    updateDeck: updateDeckInStore,
  } = useCategoriesStore();

  const getCategories = async (): Promise<Category[]> =>
    withErrorHandling(async () => {
      const categories = await categoryService.getCategories();

      if (db) {
        await db.withTransactionAsync(async () => {
          for (const category of categories) {
            await saveCategoryToSQLite(db, category);
          }
        });
      }

      const categoriesWithTimestamp = categories.map((category) => ({
        ...category,
        lastFetched: new Date().toISOString(),
      }));

      setCategories(categoriesWithTimestamp);
      return categoriesWithTimestamp;
    });

  const getCategory = async (id: number): Promise<Category> =>
    withErrorHandling(async () => {
      const category = await categoryService.getCategory(id);

      if (db) {
        await saveCategoryToSQLite(db, category);
      }

      category.lastFetched = new Date().toISOString();
      addCategory(category);

      return category;
    });

  const createCategory = async (
    data: CategoryFormData,
  ): Promise<CategoryWithoutSubcategories> =>
    withErrorHandling(async () => {
      const category = await categoryService.createCategory(data);

      if (db) {
        await saveCategoryToSQLite(db, category);
      }

      addCategory(category);

      return category;
    });

  const updateCategory = async (
    id: number,
    data: Partial<CategoryFormData>,
  ): Promise<CategoryWithoutSubcategories> =>
    withErrorHandling(async () => {
      const category = await categoryService.updateCategory(id, data);

      if (db) {
        await saveCategoryToSQLite(db, category);
      }

      updateCategoryInStore(category);

      return category;
    });

  const deleteCategories = async (): Promise<void> =>
    withErrorHandling(async () => {
      await categoryService.deleteAllCategories();

      if (db) {
        await db.runAsync('DELETE FROM Category;');
      }

      setCategories([]);
    });

  const deleteCategory = async (
    id: number,
    newParentId: number | null = null,
  ): Promise<void> =>
    withErrorHandling(async () => {
      await categoryService.deleteCategory(id, newParentId);

      if (db) {
        await deleteCategoryFromSQLite(db, id, newParentId);
      }

      deleteCategoryFromStore(id);

      // Если newParentId не null, нужно обновить родительскую категорию в хранилище
    });

  const getDecks = async (): Promise<Deck[]> =>
    withErrorHandling(async () => {
      const decks = await deckService.getDecks();

      // for (const deck of decks) {
      //   if (db) {
      //     await saveDeckToSQLite(db, deck);
      //   }
      // }

      setDecks(decks);

      return decks; // return decks after processing
    });

  const createDeck = async (data: DeckFormData): Promise<Deck> =>
    withErrorHandling(async () => {
      const deck = await deckService.createDeck(data);

      if (db) {
        await saveDeckToSQLite(db, deck);
      }

      addDeck(deck);

      return deck;
    });

  const updateDeck = async (
    id: number,
    data: Partial<DeckFormData>,
  ): Promise<Deck> =>
    withErrorHandling(async () => {
      const deck = await deckService.updateDeck(id, data);

      if (db) {
        await saveDeckToSQLite(db, deck);
      }

      updateDeckInStore(deck);

      return deck;
    });

  const deleteDeck = async (id: number): Promise<void> =>
    withErrorHandling(async () => {
      await deckService.deleteDeck(id);

      if (db) {
        await deleteDeckFromSQLite(db, id);
      }

      deleteDeckFromStore(id);
    });

  const updateDeckCards = async (
    id: number,
    data: { cards: UpdateCardDto[] },
  ): Promise<Card[]> =>
    withErrorHandling(async () => {
      const cards = await deckService.patchDeckCards(id, data);

      // if (db) {
      //   await saveDeckToSQLite(db, deck);
      // }

      // ID = deckId
      //

      // updateDeckInStore(deck);

      return cards;
    });

  return {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteCategories,
    getDecks,
    createDeck,
    updateDeck,
    deleteDeck,
    updateDeckCards,
  };
};

export default useCategoryServerService;
