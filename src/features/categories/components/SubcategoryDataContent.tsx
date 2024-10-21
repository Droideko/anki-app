import { StyleSheet } from "react-native";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { Text } from "@/src/shared/components/ui/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { CategoryItem } from "./CategoryItem";
import { useFetchCategories } from "@/src/features/categories/hooks/useFetchCategories";
import CategoryBlurModal from "./CategoryBlurModal";
import DeckItem from "../../decks/components/DeckItem";
import DeleteModal from "./DeleteModal";

export default function SubcategoryDataContent() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (typeof id === "undefined") {
    return <Text>Id category is undefined</Text>;
  }

  const { loading, error, categories, decks } = useFetchCategories(Number(id));

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error loading categories</Text>;
  }

  console.log(categories);
  console.log(decks);

  return (
    <ThemedView style={styles.container}>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
      {decks.map((item) => (
        <DeckItem key={item.id} item={item} />
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
