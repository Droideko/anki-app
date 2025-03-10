import isDataStale from '../utils/isDataStale';

import useCategoryServerService from './services/useCategoryServerService';
import useCategorySQLiteService from './services/useCategorySQLiteService';

import { useUserStore } from '@shared/store/useUserStore';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { Category } from '@shared/types/category';
import denormalizeCategory from '@shared/utils/denormalizeCategory';
import executeWithNetworkFallback from '@shared/utils/executeWithNetworkFallback';
import {
  CategoryFormData,
  CategoryWithoutSubcategories,
} from '@features/categories/types';
import { Deck, DeckFormData } from '@shared/types/deck';
import { UpdateCardDto } from '@shared/api/deckService';

export const useCategoryRepository = () => {
  const { user } = useUserStore();
  const { rootCategoryIds, categoriesById, decksById } = useCategoriesStore();

  const serverService = useCategoryServerService();
  const SQLiteService = useCategorySQLiteService();

  const getCategoriesFromCache = (): Category[] => {
    return rootCategoryIds.map((rootId) =>
      denormalizeCategory(rootId, categoriesById, decksById),
    );
  };

  const getCategories = async (): Promise<Category[]> => {
    if (rootCategoryIds.length > 0) {
      const rootCategories = rootCategoryIds.map((id) => categoriesById[id]);
      const isStale = isDataStale(rootCategories[0].lastFetched);

      if (isStale) {
        fetchCategoriesAndUpdateCache();
      }
      return getCategoriesFromCache();
    }

    return fetchCategoriesAndUpdateCache();
  };

  const fetchCategoriesAndUpdateCache = async (): Promise<Category[]> =>
    executeWithNetworkFallback(
      () => serverService.getCategories(),
      () => SQLiteService.getCategories(),
    );

  const getCategory = async (id: number): Promise<Category> => {
    const existingCategory = categoriesById[id];

    if (existingCategory) {
      const isStale = isDataStale(existingCategory.lastFetched);

      if (isStale) {
        fetchCategoryAndUpdateCache(id);
      }
      return denormalizeCategory(id, categoriesById, decksById);
    }

    return fetchCategoryAndUpdateCache(id);
  };

  const fetchCategoryAndUpdateCache = async (id: number): Promise<Category> =>
    executeWithNetworkFallback(
      () => serverService.getCategory(id),
      () => SQLiteService.getCategory(id),
    );

  const createCategory = async (
    data: CategoryFormData,
  ): Promise<CategoryWithoutSubcategories> => {
    if (!user?.id) {
      throw new Error("User is't login");
    }

    return executeWithNetworkFallback(
      () => serverService.createCategory(data),
      () => SQLiteService.createCategory(data),
    );
  };

  const updateCategory = async (
    id: number,
    data: Partial<CategoryFormData>,
  ): Promise<CategoryWithoutSubcategories> =>
    executeWithNetworkFallback(
      () => serverService.updateCategory(id, data),
      () => SQLiteService.updateCategory(id, data),
    );

  const getDecks = async (): Promise<Deck[]> => {
    return executeWithNetworkFallback(
      () => serverService.getDecks(),
      () => SQLiteService.getDecks(),
    );
  };

  const deleteCategory = async (
    id: number,
    newParentId: number | null = null,
  ): Promise<void> =>
    executeWithNetworkFallback(
      () => serverService.deleteCategory(id, newParentId),
      () => SQLiteService.deleteCategory(id, newParentId),
    );

  const deleteAllCategories = async (): Promise<void> =>
    executeWithNetworkFallback(
      () => serverService.deleteCategories(),
      () => SQLiteService.deleteCategories(),
    );

  const createDeck = async (data: DeckFormData): Promise<Deck> =>
    executeWithNetworkFallback(
      () => serverService.createDeck(data),
      () => SQLiteService.createDeck(data),
    );

  const updateDeck = async (
    id: number,
    data: Partial<DeckFormData>,
  ): Promise<Deck> =>
    executeWithNetworkFallback(
      () => serverService.updateDeck(id, data),
      () => SQLiteService.updateDeck(id, data),
    );

  const deleteDeck = async (id: number): Promise<void> =>
    executeWithNetworkFallback(
      () => serverService.deleteDeck(id),
      () => SQLiteService.deleteDeck(id),
    );

  // const updateDeckCards = async (
  //   id: number,
  //   data: { cards: UpdateCardDto[] },
  // ): Promise<Deck> =>
  //   executeWithNetworkFallback(
  //     () => serverService.updateDeckCards(id, data),
  //     () => SQLiteService.updateDeckCards(id, data),
  //   );

  return {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteAllCategories,
    getDecks,
    createDeck,
    deleteDeck,
    updateDeck,
    // updateDeckCards,
  };
};

// Примечания и рекомендации
// Синхронизация офлайн-изменений: При работе в офлайн-режиме изменения (создание, обновление, удаление категорий) накапливаются локально. Вам нужно реализовать механизм синхронизации этих изменений с сервером при восстановлении соединения.
// Обработка временных идентификаторов: При создании категорий в офлайн-режиме вы используете временные идентификаторы. При синхронизации с сервером вам нужно обновлять эти идентификаторы на реальные, полученные с сервера, и обновлять все связанные записи.
// Очередь синхронизации: Рассмотрите возможность создания очереди изменений, которая будет отправляться на сервер при восстановлении соединения. Это может быть реализовано с помощью отдельного модуля или сервиса.
// Обработка конфликтов: При синхронизации данных могут возникать конфликты. Вам нужно продумать стратегию их разрешения (например, последний изменивший выигрывает, или предоставлять пользователю выбор).
// Обновление Zustand-хранилища: Убедитесь, что все изменения в Zustand-хранилище корректно отражают состояние данных после операций создания, обновления и удаления.
