import React from 'react';
import { StyleSheet, View } from 'react-native';

import CategorySegmentButtons from './CategorySegmentButtons';

import { Text } from '@shared/components/ui/ThemedText';
import { NormalizedCategory } from '@shared/types/category';

function CategoryItemTitle({ item }: { item: NormalizedCategory }) {
  return (
    <View style={styles.categoryTitleContainer}>
      <Text variant="titleMedium" style={styles.categoryTitle}>
        {item.name}
      </Text>
      <CategorySegmentButtons item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    alignItems: 'center',
    display: 'flex',
  },
  categoryTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
});

export default CategoryItemTitle;
