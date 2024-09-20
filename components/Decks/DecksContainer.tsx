import React from "react";
import { ThemedView } from "../ThemedView";
import { Text } from "../ThemedText";
// import { Link } from "expo-router";
// import { Button } from "react-native";
import { StyleSheet, Button } from "react-native";
import DecksContent from "./DecksContent";
import CreateIconButton from "./CreateIconButton";
import { Link } from "expo-router";
// import MyModal from "./MyModal";

export default function DecksContainer() {
  const onClick = () => {};

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <Text variant="headlineMedium">Decks</Text>
        {/* <MyModal /> */}

        {/* <Link href="/desks/25" asChild>
        <Button title="Desk 25" />
      </Link> */}
        <CreateIconButton size={32} />
        {/* <Link href="/desks/create-desk" asChild>
          <Button title="Open Details 115"></Button>
        </Link> */}
      </ThemedView>
      <DecksContent />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
