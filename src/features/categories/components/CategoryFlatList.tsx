import React from 'react';
import { FlatList, FlatListProps, StyleSheet } from 'react-native';

import { ListItem } from '../types';
import getKeyExtractor from '../utils/getKeyExtractor';
import useCombinedListData from '../hooks/useCombinedListData';

import CategoriesItem from './CategoriesItem';

import { NormalizedCategory } from '@shared/types/category';
import { Deck } from '@shared/types/deck';

type CategoryFlatListProps = {
  filteredCategories: NormalizedCategory[];
  filteredDecks: Deck[];
} & Omit<FlatListProps<ListItem>, 'data' | 'renderItem' | 'keyExtractor'>;

export default function CategoryFlatList({
  filteredCategories,
  filteredDecks,
  ...flatListProps
}: CategoryFlatListProps) {
  const { combinedData, stickyHeaderIndices } = useCombinedListData(
    filteredCategories,
    filteredDecks,
  );

  return (
    <FlatList
      data={combinedData}
      renderItem={({ item }) => <CategoriesItem {...item} />}
      keyExtractor={getKeyExtractor}
      stickyHeaderIndices={stickyHeaderIndices}
      contentContainerStyle={styles.listContent}
      {...flatListProps}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 60,
    padding: 20,
  },
});
