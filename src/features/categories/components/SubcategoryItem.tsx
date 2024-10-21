import { forwardRef } from "react";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableHighlight } from "react-native";
import {
  ADD_SUBCATEGORY_ITEM,
  ITEM_SPACING,
  ITEM_WIDTH,
} from "@/src/features/categories/constants";
import { NormalizedCategory } from "@/src/features/categories/utils/normalizeCategories";
import { SubCategoryItemType } from "@/src/types/category";
import SubcategoryAddItem from "./SubcategoryAddItem";
import SubcategoryCard from "./SubcategoryCard";

type SubcategoryItemProps = {
  parentCategoryId: NormalizedCategory["id"];
  item: SubCategoryItemType;
  onLongPress: () => void;
};

const SubcategoryItem = forwardRef<TouchableHighlight, SubcategoryItemProps>(
  ({ parentCategoryId, item, onLongPress }, ref) => {
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
            item.type === "CATEGORY"
              ? `/categories/${item.id}`
              : `/categories/${parentCategoryId}/decks/${item.id}`;
          router.push({ pathname, params: { name: item.name } });
        }}
      >
        <SubcategoryCard item={item} />
      </TouchableHighlight>
    );
  }
);

export default SubcategoryItem;

const styles = StyleSheet.create({
  subcategoryItem: {
    width: ITEM_WIDTH,
    marginRight: ITEM_SPACING,
  },
});
