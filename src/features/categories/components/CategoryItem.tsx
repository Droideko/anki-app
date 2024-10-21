import React, { useRef } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { NormalizedCategory } from "@/src/features/categories/utils/normalizeCategories";
import {
  ADD_SUBCATEGORY_ITEM,
  HEIGHT_CATEGORY_CAROUSEL,
  ITEM_SPACING,
  ITEM_WIDTH,
} from "@/src/features/categories/constants";

import { useSubcategoriesAndDecks } from "@/src/features/categories/hooks/useSubcategoriesAndDecks";
import { useModalStore } from "@/src/shared/store/useModalStore";
import { SubCategoryItemType } from "@/src/types/category";
import CategoryItemTitle from "./CategoryItemTitle";
import SubcategoryItem from "./SubcategoryItem";

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
        data={[...sliderItems, ADD_SUBCATEGORY_ITEM]} // TODO подумать, может можно оптимизировать через push код
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
        mode="parallax" // Используем режим параллакса для частичного отображения следующего элемента
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 10,
        }}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10], // Чувствительность жестов
        }}
        pagingEnabled={false}
        snapEnabled={true}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    marginBottom: 8,
  },
  categoryTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryTitle: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  carousel: {
    overflow: "visible", // Позволяет отображать элементы за пределами карусели
  },
});
