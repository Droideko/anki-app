import NetInfo from '@react-native-community/netinfo';
import { useSQLiteContext } from 'expo-sqlite';

import saveCategoryToSQLite from '@features/categories/services/saveCategoryToSQLite';
import { useUserStore } from '@shared/store/useUserStore';
import getCategoryFromSQLite from '@features/categories/services/getCategoryFromSQLite';
import deleteCategoryFromSQLite from '@features/categories/services/deleteCategoryFromSQLite';
import isWeb from '@shared/utils/isWeb';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import getCategoriesFromSQLite from '@features/categories/services/getCategoriesFromSQLite';
import { Category } from '@shared/types/category';
import { categoryService } from '@features/categories/services/categoryService';
import {
  CategoryFormData,
  CategoryWithoutSubcategories,
} from '@features/categories/types';

export const useCategoryRepository = () => {
  const db = isWeb() ? null : useSQLiteContext();
  const { user } = useUserStore();
  const {
    setCategories,
    addCategory,
    updateCategoryInStore,
    deleteCategoryFromStore,
  } = useCategoriesStore();

  const getCategories = async (): Promise<Category[]> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const response = await categoryService.getCategories();
        const categories = response.data;

        if (db) {
          await db.withTransactionAsync(async () => {
            // await db.runAsync('DELETE FROM Category;'); // Очищаем таблицу перед обновлением
            for (const category of categories) {
              await saveCategoryToSQLite(db, category);
            }
          });
        }

        // Обновляем Zustand-хранилище
        setCategories(categories);

        return categories;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(
            'Ошибка при создании категории на сервере: ' + error.message,
          );
        }
        throw new Error('Somethings was wrong!');
      }
    } else {
      try {
        if (!db) {
          throw new Error('Used Browser');
        }

        const categories = await getCategoriesFromSQLite(db);

        // Обновляем Zustand-хранилище
        setCategories(categories);

        return categories;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(
            'Ошибка при создании категории на сервере: ' + error.message,
          );
        }
        throw new Error('Somethings was wrong!');
      }
    }
  };

  const getCategory = async (id: number): Promise<Category> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const response = await categoryService.getCategory(id);
        const category = response.data;

        // Сохраняем категорию в SQLite
        if (db) {
          await saveCategoryToSQLite(db, category);
        }

        // Обновляем Zustand-хранилище

        addCategory(category);

        return category;
      } catch (error: any) {
        throw new Error(
          'Ошибка при получении категории с сервера: ' + error.message,
        );
      }
    } else {
      try {
        if (!db) {
          throw new Error('Used Browser');
        }

        const category = await getCategoryFromSQLite(db, id);

        // Обновляем Zustand-хранилище
        addCategory(category);

        return category;
      } catch (error: any) {
        throw new Error(
          'Ошибка при получении категории из SQLite: ' + error.message,
        );
      }
    }
  };

  const createCategory = async (
    data: CategoryFormData,
  ): Promise<CategoryWithoutSubcategories> => {
    if (!user?.id) {
      throw new Error("User is't login");
    }

    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const response = await categoryService.createCategory(data);
        const category = response.data;

        // Сохраняем категорию в SQLite
        if (db) {
          await saveCategoryToSQLite(db, category);
        }

        // Обновляем Zustand-хранилище
        addCategory(category);

        return category;
      } catch (error: any) {
        throw new Error(
          'Ошибка при создании категории на сервере: ' + error.message,
        );
      }
    } else {
      try {
        if (!db) {
          throw Error('Used browser');
        }
        // Генерируем временный ID (нужно продумать механизм синхронизации)
        const tempId = Date.now();

        const newCategory: Category = {
          id: tempId,
          name: data.name,
          userId: Number(user.id),
          parentId: data.parentId || null, // TODO подумать по поводу null
          accessLevel: 'PRIVATE', // data.accessLevel || "PRIVATE",
          type: 'CATEGORY',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          subcategories: [],
          decks: [],
        };

        // Сохраняем категорию в SQLite
        await saveCategoryToSQLite(db, newCategory);

        // Обновляем Zustand-хранилище
        addCategory(newCategory);

        // Добавляем в очередь синхронизации, если требуется

        return newCategory;
      } catch (error: any) {
        throw new Error(
          'Ошибка при создании категории в офлайн-режиме: ' + error.message,
        );
      }
    }
  };

  const updateCategory = async (
    id: number,
    data: Partial<CategoryFormData>,
  ): Promise<CategoryWithoutSubcategories> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const response = await categoryService.updateCategory(id, data);
        const category = response.data;

        // Обновляем категорию в SQLite
        if (db) {
          await saveCategoryToSQLite(db, category);
        }

        // Обновляем Zustand-хранилище
        updateCategoryInStore(category);

        return category;
      } catch (error: any) {
        throw new Error(
          'Ошибка при обновлении категории на сервере: ' + error.message,
        );
      }
    } else {
      try {
        if (!db) {
          throw Error('Used browser');
        }

        // Обновляем категорию в SQLite
        await db.runAsync(
          `UPDATE Category SET
            name = COALESCE(?, name),
            parentId = COALESCE(?, parentId),
            accessLevel = COALESCE(?, accessLevel),
            updatedAt = ?
          WHERE id = ?;`,
          data.name ?? null,
          data.parentId ?? null,
          data.accessLevel ?? null,
          new Date().toISOString(),
          id,
        );

        // Получаем обновленную категорию из SQLite
        const category = await getCategoryFromSQLite(db, id);

        // Обновляем Zustand-хранилище
        updateCategoryInStore(category);

        // Добавляем в очередь синхронизации, если требуется

        return category;
      } catch (error: any) {
        throw new Error(
          'Ошибка при обновлении категории в офлайн-режиме: ' + error.message,
        );
      }
    }
  };

  const deleteCategory = async (
    id: number,
    newParentId: number | null = null,
  ): Promise<void> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        await categoryService.deleteCategory(id, newParentId);

        // Удаляем категорию из SQLite
        if (db) {
          await deleteCategoryFromSQLite(db, id, newParentId);
        }
        // Обновляем Zustand-хранилище
        deleteCategoryFromStore(id);

        // Если newParentId не null, нужно обновить родительскую категорию в хранилище
      } catch (error: any) {
        throw new Error(
          'Ошибка при удалении категории на сервере: ' + error.message,
        );
      }
    } else {
      // Оффлайн-режим
      try {
        if (!db) {
          throw new Error('Used Browser');
        }
        // Удаляем категорию из SQLite
        await deleteCategoryFromSQLite(db, id, newParentId);

        // Обновляем Zustand-хранилище
        deleteCategoryFromStore(id);

        // Добавляем в очередь синхронизации, если требуется
      } catch (error: any) {
        throw new Error(
          'Ошибка при удалении категории в офлайн-режиме: ' + error.message,
        );
      }
    }
  };

  const deleteAllCategories = async (): Promise<void> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        await categoryService.deleteAllCategories();

        // Очищаем таблицу Category в SQLite
        if (db) {
          await db.runAsync('DELETE FROM Category;');
        }

        // Обновляем Zustand-хранилище
        setCategories([]);
      } catch (error: any) {
        throw new Error(
          'Ошибка при удалении всех категорий на сервере: ' + error.message,
        );
      }
    } else {
      // Оффлайн-режим
      try {
        // Очищаем таблицу Category в SQLite
        if (!db) {
          throw Error('Used Browser');
        }
        await db.runAsync('DELETE FROM Category;');

        // Обновляем Zustand-хранилище
        setCategories([]);

        // Добавляем в очередь синхронизации, если требуется
      } catch (error: any) {
        throw new Error(
          'Ошибка при удалении всех категорий в офлайн-режиме: ' +
            error.message,
        );
      }
    }
  };

  return {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    deleteAllCategories,
  };

  // Добавляйте другие методы репозитория
};

// Примечания и рекомендации
// Синхронизация офлайн-изменений: При работе в офлайн-режиме изменения (создание, обновление, удаление категорий) накапливаются локально. Вам нужно реализовать механизм синхронизации этих изменений с сервером при восстановлении соединения.

// Обработка временных идентификаторов: При создании категорий в офлайн-режиме вы используете временные идентификаторы. При синхронизации с сервером вам нужно обновлять эти идентификаторы на реальные, полученные с сервера, и обновлять все связанные записи.

// Очередь синхронизации: Рассмотрите возможность создания очереди изменений, которая будет отправляться на сервер при восстановлении соединения. Это может быть реализовано с помощью отдельного модуля или сервиса.

// Обработка конфликтов: При синхронизации данных могут возникать конфликты. Вам нужно продумать стратегию их разрешения (например, последний изменивший выигрывает, или предоставлять пользователю выбор).

// Обновление Zustand-хранилища: Убедитесь, что все изменения в Zustand-хранилище корректно отражают состояние данных после операций создания, обновления и удаления.
