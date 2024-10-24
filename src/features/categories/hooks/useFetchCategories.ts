import { useEffect, useState, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { Deck } from '@shared/types/deck';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { useMountedState } from '@shared/hooks/useMountedState';
import { NormalizedCategory } from '@shared/types/category';

interface UseFetchCategoriesResult {
  loading: boolean;
  error: Error | null;
  categories: NormalizedCategory[];
  decks: Deck[];
}

export function useFetchCategories(
  categoryId?: number,
): UseFetchCategoriesResult {
  const isMounted = useMountedState();

  const { categoriesById, rootCategoryIds, decksById } = useCategoriesStore(
    useShallow((state) => ({
      categoriesById: state.categoriesById,
      rootCategoryIds: state.rootCategoryIds,
      decksById: state.decksById,
    })),
  );

  const { getCategories, getCategory } = useCategoryRepository();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof categoryId === 'number') {
          await getCategory(categoryId);
        } else {
          await getCategories();
        }
      } catch (err: any) {
        if (isMounted()) {
          console.error('Ошибка при загрузке категорий:', err);
          setError(err);
        }
      } finally {
        if (isMounted()) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [categoryId]);

  const { categories, decks } = useMemo(() => {
    if (loading || error) {
      return { categories: [], decks: [] };
    }

    let categoryList: NormalizedCategory[] = [];
    let deckList: Deck[] = [];

    if (typeof categoryId === 'number') {
      const category = categoriesById[categoryId];

      if (category) {
        // Получаем подкатегории
        categoryList = category.childIds.map(
          (childId) => categoriesById[childId],
        );

        // Получаем колоды, связанные с категорией
        deckList = category.deckIds
          .map((deckId) => decksById[deckId])
          .filter(Boolean); // Исключаем undefined, если какие-то колоды не найдены
      } else {
        return { categories: [], decks: [] };
      }
    } else {
      // Если нет categoryId, получаем корневые категории
      categoryList = rootCategoryIds.map((id) => categoriesById[id]);

      // Опционально: получить колоды без категории (если такие есть)
      deckList = Object.values(decksById).filter((deck) => !deck.categoryId);
    }

    // Сортируем категории и колоды по updatedAt
    categoryList.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    deckList.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

    return { categories: categoryList, decks: deckList };
  }, [categoriesById, decksById, rootCategoryIds, categoryId, loading, error]);

  return { loading, error, categories, decks };
}
