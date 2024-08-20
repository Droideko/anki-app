import { StyleSheet, Image, Platform, Button } from "react-native";

import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <Text type="title">Desks List: </Text>

      <Link href="/desks/25" asChild>
        <Button title="Desk 25" />
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
