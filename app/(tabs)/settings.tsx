import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LanguageSetting from "@/components/LanguageSetting";

export default function SettingsScreen() {
  console.log("Settings screen rerender");

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <LanguageSetting />
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
