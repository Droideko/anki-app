import withErrorHandling from '@features/categories/utils/withErrorHandling';
import { Category } from '@shared/types/category';
import { useUserStore } from '@shared/store/useUserStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import getCategoriesFromSQLite from '@features/categories/services/sqlite/getCategoriesFromSQLite';
import getCategoryFromSQLite from '@features/categories/services/sqlite/getCategoryFromSQLite';
import updateCategoryToSQLite from '@features/categories/services/sqlite/updateCategoryToSQLite';
import saveCategoryToSQLite from '@features/categories/services/sqlite/saveCategoryToSQLite';
import deleteCategoryFromSQLite from '@features/categories/services/sqlite/deleteCategoryFromSQLite';
import { CategoryFormData } from '@features/categories/types';
import useGetSQLiteContext from '@shared/utils/isWeb/useGetSQLiteContext';
import { Deck, DeckFormData } from '@shared/types/deck';
import saveDeckToSQLite from '@shared/db/deck/saveDeckToSQLite';
import deleteDeckFromSQLite from '@features/decks/services/deleteDeckFromSQLite';
import getDeckFromSQLite from '@shared/db/deck/getDeckFromSQLite';
import { UpdateCardDto } from '@shared/api/deckService';
import getDecksFromSQLite from '@features/decks/services/getDecksFromSQLite';

const useCategorySQLiteService = () => {
  const {
    setCategories,
    addCategory,
    updateCategory: updateCategoryInStore,
    deleteCategory: deleteCategoryFromStore,
    setDecks,
    addDeck,
    updateDeck: updateDeckInStore,
    deleteDeck: deleteDeckFromStore,
  } = useCategoriesStore();

  const db = useGetSQLiteContext();
  const { user } = useUserStore();

  const getCategories = async (): Promise<Category[]> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      const categories = await getCategoriesFromSQLite(db);

      const categoriesWithTimestamp = categories.map((category) => ({
        ...category,
        lastFetched: new Date().toISOString(),
      }));

      setCategories(categoriesWithTimestamp);
      return categoriesWithTimestamp;
    });

  const getCategory = async (id: number): Promise<Category> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      const category = await getCategoryFromSQLite(db, id);

      category.lastFetched = new Date().toISOString();
      addCategory(category);

      return category;
    });

  const createCategory = async (data: CategoryFormData): Promise<Category> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      const tempId = Date.now();

      const newCategory: Category = {
        id: Number(tempId),
        name: data.name,
        userId: Number(user?.id),
        parentId: data.parentId || null,
        accessLevel: 'PRIVATE',
        type: 'CATEGORY',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        subcategories: [],
        decks: [],
        lastFetched: new Date().toISOString(),
      };

      await saveCategoryToSQLite(db, newCategory);

      addCategory(newCategory);

      return newCategory;
    });

  const updateCategory = async (
    id: number,
    data: Partial<CategoryFormData>,
  ): Promise<Category> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      await updateCategoryToSQLite(db, id, data);

      const category = await getCategoryFromSQLite(db, id);

      updateCategoryInStore(category);

      return category;
    });

  const deleteCategory = async (
    id: number,
    newParentId: number | null = null,
  ): Promise<void> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      await deleteCategoryFromSQLite(db, id, newParentId);

      deleteCategoryFromStore(id);
    });

  const deleteCategories = async (): Promise<void> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      await db.runAsync('DELETE FROM Category;');

      setCategories([]);
    });

  const createDeck = async (data: DeckFormData): Promise<Deck> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      const tempId = Date.now();

      const newDeck: Deck = {
        id: tempId,
        name: data.name || 'Untitled Deck',
        userId: Number(user?.id),
        categoryId: data.categoryId!,
        accessLevel: 'PRIVATE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: 'DECK',
      };

      await saveDeckToSQLite(db, newDeck);

      addDeck(newDeck);

      return newDeck;
    });

  // TODO !!!!!!!!!!!!!!!!!!!???????????????
  const getDecks = async (): Promise<Deck[]> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      const decks = await getDecksFromSQLite(db);

      const decksWithTimestamp = decks.map((deck) => ({
        ...deck,
        lastFetched: new Date().toISOString(),
      }));

      setDecks(decksWithTimestamp);
      return decksWithTimestamp;
    });

  const updateDeck = async (
    id: number,
    data: Partial<DeckFormData>,
  ): Promise<Deck> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      // await updateDeckToSQLite(db, id, data); // TODO

      const deck = await getDeckFromSQLite(db, id);

      updateDeckInStore(deck);

      return deck;
    });

  const deleteDeck = async (id: number): Promise<void> =>
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      await deleteDeckFromSQLite(db, id);

      deleteDeckFromStore(id);
    });

  const updateDeckCards = async (
    id: number,
    data: { cards: UpdateCardDto[] },
  ): Promise<Deck> => // TODO: CHECK !!!!!!!!!
    withErrorHandling(async () => {
      if (!db) {
        throw new Error('Local database unavailable');
      }

      // await updateDeckToSQLite(db, id, data); // TODO

      const deck = await getDeckFromSQLite(db, id); // TODO: CHECK !!!!!!!!!

      updateDeckInStore(deck); // TODO: CHECK !!!!!!!!!

      return deck; // TODO: CHECK !!!!!!!!!
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

export default useCategorySQLiteService;
