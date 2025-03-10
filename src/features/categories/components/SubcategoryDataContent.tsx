import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import useFilteredCategoriesAndDecks from '../hooks/useFilteredCategoriesAndDecks';
import { useCategoryRepository } from '../hooks/useCategoryRepository';

// import DeleteModal from './DeleteModal';
import CategoryFlatList from './CategoryFlatList';
import CategoriesEmpty from './CategoriesEmpty';
import CategoryEmpty from './CategoryEmpty';

import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';
import { useFetchCategories } from '@features/categories/hooks/useFetchCategories';
import BlurModal from '@shared/components/modal/BlurModal';
import useRefresh from '@shared/hooks/useRefresh';
import Search from '@shared/components/Search';
import LoadingSpinner from '@shared/components/ui/LoadingSpinner';

export default function SubcategoryDataContent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const { loading, error, categories, decks } = useFetchCategories(Number(id));

  const { getCategory } = useCategoryRepository();
  const [refreshing, onRefresh] = useRefresh([() => getCategory(Number(id))]);

  const { filteredCategories, filteredDecks } = useFilteredCategoriesAndDecks(
    search,
    categories,
    decks,
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <Text>{error.message}</Text>;
  if (categories.length === 0 && decks.length === 0) return <CategoryEmpty />;

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
    // paddingBottom: 16,
    // paddingTop: 16,
  },
  listContent: {
    paddingBottom: 60,
    padding: 20,
  },
  searchStyle: {
    marginBottom: 12,
  },
});
