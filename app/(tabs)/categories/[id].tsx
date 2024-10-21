import { Stack, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import SubcategoryDataContent from "@/src/features/categories/components/SubcategoryDataContent";
import { StyleSheet } from "react-native";
import WaveButton from "@/src/shared/components/WaveButton";
import ScrollView from "@/src/shared/components/ScrollView";
import Search from "@/src/shared/components/Search";

const CategoryPage = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { primary } = useThemeColor();

  if (typeof id === "undefined") {
    return <></>;
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `${name}`,
          headerRight: () => (
            <Ionicons color={primary} size={22} name={"filter"} />
          ),
        }}
      />

      <ScrollView style={styles.container}>
        <Search />
        <SubcategoryDataContent />
      </ScrollView>
      <WaveButton href={`/categories/${id}/create-deck-or-subcategory`} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});

export default CategoryPage;
