import { useEffect, useState, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import sortByUpdatedAtDesc from '../utils/sortByUpdatedAtDesc';

import { Deck } from '@shared/types/deck';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { useMountedState } from '@shared/hooks/useMountedState';
import { NormalizedCategory } from '@shared/types/category';
import { RepositoryError } from '@shared/utils/errorHandler';

interface UseFetchCategoriesResult {
  loading: boolean;
  error: Error | null;
  categories: NormalizedCategory[];
  decks: Deck[];
}

const EMPTY_CATEGORIES_AND_DECKS = { categories: [], decks: [] };

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
      } catch (error) {
        if (isMounted()) {
          if (error instanceof RepositoryError) {
            setError(error);
          } else {
            setError(new Error('Something was wrong'));
          }
        }
      } finally {
        if (isMounted()) {
          setLoading(false);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const { categories, decks } = useMemo(() => {
    if (loading || error) {
      return EMPTY_CATEGORIES_AND_DECKS;
    }

    if (typeof categoryId === 'number') {
      const category = categoriesById[categoryId];

      if (!category) {
        return EMPTY_CATEGORIES_AND_DECKS;
      }

      const categoryList = category.childIds.map((id) => categoriesById[id]);
      const deckList = category.deckIds.map((id) => decksById[id]);

      categoryList.sort(sortByUpdatedAtDesc);
      deckList.sort(sortByUpdatedAtDesc);

      return { categories: categoryList, decks: deckList };
    }

    const categoryList = rootCategoryIds.map((id) => categoriesById[id]);
    categoryList.sort(sortByUpdatedAtDesc);

    return { categories: categoryList, decks: [] };
  }, [categoriesById, decksById, rootCategoryIds, categoryId, loading, error]);

  return {
    loading,
    error,
    categories,
    decks,
  };
}
