import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

// import EditScreenInfo from "@/components/EditScreenInfo";
// import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <ThemedView
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.title}>Testing</Text>
      {/* <EditScreenInfo path="app/modal.tsx" /> */}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
