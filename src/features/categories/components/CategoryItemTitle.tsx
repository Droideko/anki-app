import { StyleSheet, View } from "react-native";
import { Text } from "@/src/shared/components/ui/ThemedText";
import CategorySegmentButtons from "./CategorySegmentButtons";
import { NormalizedCategory } from "@/src/features/categories/utils/normalizeCategories";

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
  categoryTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  categoryTitle: {
    display: "flex",
    alignItems: "center",
    // fontSize: 18,
    // fontWeight: "bold",
  },
});

export default CategoryItemTitle;
