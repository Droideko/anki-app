import React from "react";
import { ThemedView } from "../../src/shared/components/ui/ThemedView";
import { Text } from "../../src/shared/components/ui/ThemedText";
import { StyleSheet } from "react-native";
import DecksContent from "./DecksContent";
import CreateIconButton from "../../src/shared/components/CreateIconButton";

export default function DecksContainer() {
  const onClick = () => {};

  return (
    <ThemedView style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <Text variant="headlineMedium">Decks</Text>

        {/* <Link href="/desks/25" asChild>
        <Button title="Desk 25" />
      </Link> */}
        <CreateIconButton href="/decks/create-deck" size={32} />
        {/* <Link href="/desks/create-desk" asChild>
          <Button title="Open Details 115"></Button>
        </Link> */}
      </ThemedView>
      {/* <DecksContent /> */}
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
