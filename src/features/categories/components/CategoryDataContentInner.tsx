import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import useFilteredCategoriesAndDecks from '../hooks/useFilteredCategoriesAndDecks';
import { useFetchCategories } from '../hooks/useFetchCategories';
import { useCategoryRepository } from '../hooks/useCategoryRepository';

// import DeleteModal from './DeleteModal';
import CategoryFlatList from './CategoryFlatList';
import CategoriesEmpty from './CategoriesEmpty';

import { ThemedView } from '@shared/components/ui/ThemedView';
import BlurModal from '@shared/components/modal/BlurModal';
import Search from '@shared/components/Search';
import { Text } from '@shared/components/ui/ThemedText';
import useRefresh from '@shared/hooks/useRefresh';
import LoadingSpinner from '@shared/components/ui/LoadingSpinner';

export default function CategoryDataContentInner() {
  const [search, setSearch] = useState('');
  const { loading, error, categories, decks } = useFetchCategories();

  const { filteredCategories, filteredDecks } = useFilteredCategoriesAndDecks(
    search,
    categories,
    decks,
  );

  const { getCategories, getDecks } = useCategoryRepository();
  const [refreshing, onRefresh] = useRefresh([getCategories, getDecks]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Text>{error.message}</Text>;
  if (categories.length === 0 && decks.length === 0) return <CategoriesEmpty />;

  return (
    <ThemedView style={styles.container}>
      <CategoryFlatList
        filteredCategories={filteredCategories}
        filteredDecks={filteredDecks}
        ListHeaderComponent={
          <Search
            style={styles.searchStyle}
            onChange={setSearch}
            debounceTime={300}
          />
        }
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text>No matching categories or decks found</Text>}
      />
      <BlurModal />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingBottom: 60,
    padding: 20,
  },
  searchStyle: {
    marginBottom: 12,
  },
});
