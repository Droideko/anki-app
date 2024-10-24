import React, { forwardRef, Ref } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableHighlight } from 'react-native';

import SubcategoryAddItem from './SubcategoryAddItem';
import SubcategoryCard from './SubcategoryCard';

import {
  ADD_SUBCATEGORY_ITEM,
  ITEM_SPACING,
  ITEM_WIDTH,
} from '@features/categories/constants';
import {
  NormalizedCategory,
  SubCategoryItemType,
} from '@shared/types/category';

type SubcategoryItemProps = {
  parentCategoryId: NormalizedCategory['id'];
  item: SubCategoryItemType;
  onLongPress: () => void;
};

function SubcategoryItemInner(
  { parentCategoryId, item, onLongPress }: SubcategoryItemProps,
  ref: Ref<TouchableHighlight>,
) {
  const router = useRouter();

  if (item.id === ADD_SUBCATEGORY_ITEM.id) {
    return <SubcategoryAddItem parentCategoryId={parentCategoryId} />;
  }

  return (
    <TouchableHighlight
      ref={ref}
      style={styles.subcategoryItem}
      onLongPress={onLongPress}
      onPress={() => {
        const pathname =
          item.type === 'CATEGORY'
            ? `/categories/${item.id}`
            : `/categories/${parentCategoryId}/decks/${item.id}`;
        router.push({ pathname, params: { name: item.name } });
      }}
    >
      <SubcategoryCard item={item} />
    </TouchableHighlight>
  );
}

const SubcategoryItem = forwardRef<TouchableHighlight, SubcategoryItemProps>(
  SubcategoryItemInner,
);

export default SubcategoryItem;

const styles = StyleSheet.create({
  subcategoryItem: {
    marginRight: ITEM_SPACING,
    width: ITEM_WIDTH,
  },
});
