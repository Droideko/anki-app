import React from 'react';
import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useFetchCategories } from '../hooks/useFetchCategories';

import CategoryMoveList from './CategoryMoveList';
import CategoryMoveButton from './CategoryMoveButton';

import { Text } from '@shared/components/ui/ThemedText';
import LoadingIndicator from '@shared/components/ui/LoadingIndicator';

export default function CategoryMoveContainer() {
  const { subCategoryId, destinationName } = useLocalSearchParams<{
    subCategoryId: string;
    destinationName: string;
  }>();

  const categoryId = subCategoryId ? Number(subCategoryId) : undefined;

  const { loading, error, categories } = useFetchCategories(categoryId);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <>
      <Text style={styles.text} variant="headlineMedium">
        {destinationName || 'Categories'}
      </Text>
      <CategoryMoveList categories={categories} />
      <CategoryMoveButton />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginBottom: 12,
  },
});
