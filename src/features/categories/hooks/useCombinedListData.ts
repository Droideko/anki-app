import { useMemo } from 'react';

import { ListItem } from '../types';

import { NormalizedCategory } from '@shared/types/category';
import { Deck } from '@shared/types/deck';

const useCombinedListData = (
  filteredCategories: NormalizedCategory[],
  filteredDecks: Deck[],
) => {
  const combinedData: ListItem[] = useMemo(() => {
    const data: ListItem[] = [];

    if (filteredDecks.length > 0) {
      data.push({ type: 'header', title: 'Decks' });
      filteredDecks.forEach((deck) => {
        data.push({ type: 'deck', item: deck });
      });
    }

    if (filteredCategories.length > 0) {
      data.push({ type: 'header', title: 'Categories' });
      filteredCategories.forEach((category) => {
        data.push({ type: 'category', item: category });
      });
    }

    return data;
  }, [filteredDecks, filteredCategories]);

  const stickyHeaderIndices = useMemo(() => {
    return combinedData.reduce<number[]>((indices, item, index) => {
      if (item.type === 'header') indices.push(index + 1);
      return indices;
    }, []);
  }, [combinedData]);

  return { combinedData, stickyHeaderIndices };
};

export default useCombinedListData;
