import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { CategoryItem } from './CategoryItem';
import CategoryBlurModal from './CategoryBlurModal';
import DeleteModal from './DeleteModal';

import DeckItem from '@features/decks/components/DeckItem';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';
import { useFetchCategories } from '@features/categories/hooks/useFetchCategories';

export default function SubcategoryDataContent() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (typeof id === 'undefined') {
    return <Text>Id category is undefined</Text>;
  }

  const { loading, error, categories, decks } = useFetchCategories(Number(id));

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error loading categories</Text>;
  }

  console.log(categories);
  console.log(decks);

  return (
    <ThemedView style={styles.container}>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
      {decks.map((item) => (
        <DeckItem key={item.id} item={item} />
      ))}
      <CategoryBlurModal />
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
