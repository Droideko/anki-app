import { StyleSheet } from "react-native";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { Text } from "@/src/shared/components/ui/ThemedText";
import { useAsync } from "@/src/shared/hooks/useAsync";

interface CategoryContentProps<T> {
  fetchData: () => Promise<T[] | undefined>;
  renderItem: (item: T) => React.ReactNode;
}

export default function CategoryDataContent<T>({
  fetchData,
  renderItem,
}: CategoryContentProps<T>) {
  const { value, error, loading } = useAsync(fetchData, []);

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error loading categories</Text>;
  }

  if (!value || value.length === 0) {
    return <Text>No categories available</Text>;
  }

  return (
    <ThemedView style={styles.container}>
      {value.map((item) => renderItem(item))}
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
