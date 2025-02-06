import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { NormalizedCategory } from '@shared/types/category';
import { Deck } from '@shared/types/deck';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';

function useFilteredCategoriesAndDecks(
  searchQuery: string,
  categories: NormalizedCategory[],
  decks?: Deck[],
): {
  filteredCategories: NormalizedCategory[];
  filteredDecks?: Deck[];
} {
  const { categoriesById, decksById } = useCategoriesStore(
    useShallow((state) => ({
      categoriesById: state.categoriesById,
      decksById: state.decksById,
    })),
  );

  return useMemo(() => {
    if (!searchQuery.trim()) {
      return { filteredCategories: categories, filteredDecks: decks };
    }

    const lowercasedQuery = searchQuery.toLowerCase();

    const filteredDecks = decks?.filter(
      (deck) =>
        !deck.categoryId && deck.name.toLowerCase().includes(lowercasedQuery),
    );

    const filteredCategories: NormalizedCategory[] = categories
      .map((category) => {
        const matchesCategoryName = category.name
          .toLowerCase()
          .includes(lowercasedQuery);

        if (matchesCategoryName) {
          return category;
        }

        const matchingChildIds = category.childIds.filter((childId) => {
          const childCategory = categoriesById[childId];
          return childCategory.name.toLowerCase().includes(lowercasedQuery);
        });

        const matchingDeckIds = category.deckIds.filter((deckId) => {
          const deck = decksById[deckId];
          return deck.name.toLowerCase().includes(lowercasedQuery);
        });

        if (matchingChildIds.length > 0 || matchingDeckIds.length > 0) {
          return {
            ...category,
            childIds: matchingChildIds,
            deckIds: matchingDeckIds,
          };
        }
        return null;
      })
      .filter((category): category is NormalizedCategory => category !== null);

    return { filteredCategories, filteredDecks };
  }, [categories, decks, categoriesById, decksById, searchQuery]);
}

export default useFilteredCategoriesAndDecks;
