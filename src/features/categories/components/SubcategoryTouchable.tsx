import { router } from 'expo-router';
import React, { ElementRef, useRef } from 'react';
import { StyleSheet, TouchableHighlight } from 'react-native';

import { ITEM_SPACING, ITEM_WIDTH } from '../constants';
import SubcategoryCard from '../../../shared/components/modal/SubcategoryCard';

import { SubCategoryItemTypeWithoutAddSubcategory } from '@shared/types/category';
import { useModalStore } from '@shared/store/useModalStore';

type SubcategoryTouchableProps = {
  item: SubCategoryItemTypeWithoutAddSubcategory;
};

export default function SubcategoryTouchable({
  item,
}: SubcategoryTouchableProps) {
  const elementRef = useRef<ElementRef<typeof TouchableHighlight> | null>(null);

  const { showModal } = useModalStore();

  const onLongPress = (item: SubCategoryItemTypeWithoutAddSubcategory) => {
    elementRef.current?.measureInWindow((x, y, width, height) => {
      const position = { x, y, width, height };
      showModal(position, item);
    });
  };

  const onPress = () => {
    const pathname =
      item.type === 'CATEGORY'
        ? '/(tabs)/categories/[id]'
        : '/(tabs)/categories/[id]/decks/[deckId]';

    router.push({
      pathname,
      params: {
        name: item.name,
        id: String(item.id),
        deckId: String(item.id),
      },
    });
  };

  return (
    <TouchableHighlight
      ref={elementRef}
      style={styles.subcategoryItem}
      onLongPress={() => onLongPress(item)}
      onPress={onPress}
    >
      <SubcategoryCard item={item} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  subcategoryItem: {
    marginRight: ITEM_SPACING,
    width: ITEM_WIDTH,
  },
});
