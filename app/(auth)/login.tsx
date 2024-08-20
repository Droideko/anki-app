import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ThemedText";
import { Link } from "expo-router";
import { Button } from "react-native-paper";

export default function LogInScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <Text type="title">Log In Page</Text>

      <ThemedView>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Press me
        </Button>
        <Link href={"/"}>Home</Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  link: {
    color: "white",
  },
});
