import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import CategoryItemTitle from './CategoryItemTitle';
import SubcategoryItem from './SubcategoryItem';

import { useSubcategoriesAndDecks } from '@features/categories/hooks/useSubcategoriesAndDecks';
import { NormalizedCategory } from '@shared/types/category';

export function CategoryItem({ item }: { item: NormalizedCategory }) {
  const sliderItems = useSubcategoriesAndDecks(item);

  return (
    <View style={styles.categoryItem}>
      <CategoryItemTitle item={item} />
      <FlatList
        data={sliderItems}
        horizontal
        keyExtractor={(item) => `${item.type}-${item.id}`}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: subItem }) => (
          <SubcategoryItem
            key={subItem.id}
            item={subItem}
            parentCategoryId={item.id}
          />
        )}
        style={styles.flatListWrapper}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    marginBottom: 8,
  },
  flatListContainer: {
    marginHorizontal: 20,
  },
  flatListWrapper: {
    marginHorizontal: -20,
  },
});
