import React, { memo } from 'react';
import isEqual from 'lodash/isEqual';
import { StyleSheet } from 'react-native';

import { CategoryItem } from './CategoryItem';
import DeleteModal from './DeleteModal';

import { NormalizedCategory } from '@shared/types/category';
import { ThemedView } from '@shared/components/ui/ThemedView';
import BlurModal from '@shared/components/modal/BlurModal';

function CategoryDataContentInner({
  categories,
}: {
  categories: NormalizedCategory[];
}) {
  return (
    <ThemedView style={styles.container}>
      {categories.map((item) => {
        return <CategoryItem key={`category-${item.id}`} item={item} />;
      })}
      <BlurModal />
      <DeleteModal />
    </ThemedView>
  );
}

export default memo(CategoryDataContentInner, (prevProps, nextProps) => {
  return isEqual(prevProps.categories, nextProps.categories);
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
    paddingTop: 16,
  },
});
