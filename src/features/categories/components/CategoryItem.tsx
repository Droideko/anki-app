import React, { useRef } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import CategoryItemTitle from './CategoryItemTitle';
import SubcategoryItem from './SubcategoryItem';

import {
  ADD_SUBCATEGORY_ITEM,
  ITEM_SPACING,
  ITEM_WIDTH,
} from '@features/categories/constants';
import { useSubcategoriesAndDecks } from '@features/categories/hooks/useSubcategoriesAndDecks';
import { useModalStore } from '@shared/store/useModalStore';
import {
  NormalizedCategory,
  SubCategoryItemType,
} from '@shared/types/category';
import { HEIGHT_CATEGORY_CAROUSEL } from '@shared/constants/category';

export function CategoryItem({ item }: { item: NormalizedCategory }) {
  const sliderItems = useSubcategoriesAndDecks(item);
  const elementRefs = useRef<
    Record<number | string, TouchableHighlight | null>
  >({});

  const { showModal } = useModalStore();

  const onLongPress = (item: SubCategoryItemType) => {
    if (item.id === ADD_SUBCATEGORY_ITEM.id) {
      return;
    }

    const ref = elementRefs.current[item.id];
    ref?.measureInWindow((x, y, width, height) => {
      const position = { x, y, width, height };
      showModal(position, item);
    });
  };

  return (
    <View style={styles.categoryItem}>
      <CategoryItemTitle item={item} />
      <Carousel
        data={[...sliderItems, ADD_SUBCATEGORY_ITEM]}
        renderItem={({ item: subItem }) => (
          <SubcategoryItem
            ref={(ref) => (elementRefs.current[subItem.id] = ref)}
            onLongPress={() => onLongPress(subItem)}
            item={subItem}
            parentCategoryId={item.id}
          />
        )}
        width={ITEM_WIDTH + ITEM_SPACING}
        height={HEIGHT_CATEGORY_CAROUSEL}
        style={styles.carousel}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 10,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        pagingEnabled={false}
        snapEnabled={true}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    overflow: 'visible',
  },
  categoryItem: {
    marginBottom: 8,
  },
});
