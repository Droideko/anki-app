import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import useFilteredCategoriesAndDecks from '../hooks/useFilteredCategoriesAndDecks';

import { CategoryItem } from './CategoryItem';
import DeleteModal from './DeleteModal';

import DeckItem from '@features/decks/components/DeckItem';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';
import { useFetchCategories } from '@features/categories/hooks/useFetchCategories';
import BlurModal from '@shared/components/modal/BlurModal';

interface SubcategoryDataContentProps {
  searchQuery: string;
}

export default function SubcategoryDataContent({
  searchQuery,
}: SubcategoryDataContentProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { loading, error, categories, decks } = useFetchCategories(Number(id));

  const { filteredCategories, filteredDecks } = useFilteredCategoriesAndDecks(
    searchQuery,
    categories,
    decks,
  );

  if (typeof id === 'undefined') {
    return <Text>Id category is undefined</Text>;
  }

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <ThemedView style={styles.container}>
      {filteredCategories.map((item) => (
        <CategoryItem key={`category-${item.id}`} item={item} />
      ))}
      {filteredDecks?.map((item) => (
        <DeckItem key={`deck-${item.id}`} item={item} />
      ))}
      <BlurModal />
      <DeleteModal />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingTop: 16,
  },
});
