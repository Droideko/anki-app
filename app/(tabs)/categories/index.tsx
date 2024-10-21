import ScrollView from "@/src/shared/components/ScrollView";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import Search from "@/src/shared/components/Search";
import WaveButton from "@/src/shared/components/WaveButton";
import { StyleSheet } from "react-native";
import CategoryDataContent from "@/src/features/categories/components/CategoryDataContent";

export default function CategoriesScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Search />
        <CategoryDataContent />
      </ScrollView>
      <WaveButton href="/categories/create-category" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});
