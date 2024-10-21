import { StyleSheet } from "react-native";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { Text } from "@/src/shared/components/ui/ThemedText";
import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import { CategoryItem } from "./CategoryItem";
import CategoryBlurModal from "./CategoryBlurModal";
import DeleteModal from "./DeleteModal";

export default function CategoryDataContent() {
  const { loading, error, categories } = useFetchCategories();

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error loading categories</Text>;
  }

  if (categories.length === 0) {
    return <Text>No categories available</Text>;
  }

  return (
    <ThemedView style={styles.container}>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
      <CategoryBlurModal />
      <DeleteModal />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
});
