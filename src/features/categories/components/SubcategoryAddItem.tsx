import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Card, Icon } from "react-native-paper";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { Category } from "@/src/types/category";
import {
  HEIGHT_CATEGORY_CAROUSEL,
  ITEM_SPACING,
  ITEM_WIDTH,
} from "@/src/features/categories/constants";

interface SubcategoryAddItemProps {
  parentCategoryId: Category["id"];
}

export default function SubcategoryAddItem({
  parentCategoryId,
}: SubcategoryAddItemProps) {
  const { primary, border, elevation } = useThemeColor();
  const router = useRouter();

  return (
    <Pressable
      style={styles.subcategoryItem}
      onPress={() => {
        router.push({
          pathname: `/categories/${parentCategoryId}/create-deck-or-subcategory`,
          // params: { parentCategoryId },
        });
      }}
    >
      <Card
        mode="elevated"
        style={{
          height: HEIGHT_CATEGORY_CAROUSEL,
          borderBlockEndColor: border,
          backgroundColor: elevation.level1,
        }}
      >
        <Card.Content style={styles.contentIcon}>
          <Icon color={primary} source="plus" size={36} />
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  subcategoryItem: {
    width: ITEM_WIDTH,
    marginRight: ITEM_SPACING,
  },
  contentIcon: {
    display: "flex",
    alignItems: "center",
  },
});
