import React from 'react';
import { StyleSheet } from 'react-native';

import { CategoryItem } from '@features/categories/components/CategoryItem';
import CategoryBlurModal from '@features/categories/components/CategoryBlurModal';
import DeleteModal from '@features/categories/components/DeleteModal';
import { ThemedView } from '@shared/components/ui/ThemedView';
import { Text } from '@shared/components/ui/ThemedText';
import { useFetchCategories } from '@features/categories/hooks/useFetchCategories';

export default function CategoryDataContent() {
  const { loading, error, categories } = useFetchCategories();

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error loading categories</Text>;
  }

  if (categories.length === 0) {
    return <Text>No categories available</Text>;
  }

  return (
    <ThemedView style={styles.container}>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
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
