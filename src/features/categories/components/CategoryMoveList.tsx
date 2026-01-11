import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

import SubcategoryCard from '../../../shared/components/modal/SubcategoryCard';

import { NormalizedCategory } from '@shared/types/category';

interface CategoryMoveListProps {
  categories: NormalizedCategory[];
}

export default function CategoryMoveList({
  categories,
}: CategoryMoveListProps) {
  const { id, name } = useLocalSearchParams<{
    id: string;
    name: string;
  }>();

  const onPress = (item: NormalizedCategory) => {
    router.push({
      pathname: `/categories/[id]/move/[subCategoryId]`,
      params: {
        id,
        name,
        destinationName: item.name,
        subCategoryId: String(item.id),
      },
    });
  };

  return (
    <>
      {categories.map((category) => {
        if (category.id === Number(id)) {
          return null;
        }
        return (
          <SubcategoryCard
            onPress={() => onPress(category)}
            key={category.id}
            item={category}
            style={styles.card}
            iconSize={25}
          />
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 52,
    marginBottom: 10,
  },
});
