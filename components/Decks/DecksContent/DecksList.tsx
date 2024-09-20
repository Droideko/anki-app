import ThemedIconButton from "@/components/ThemedIconButton";
import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";
import Deck from "./Deck";

export type DeckItem = {
  id: number;
  name: string;
};

export default function DecksList() {
  const [decks, setDecks] = useState<DeckItem[]>([
    { id: 1, name: "First Deck" },
  ]);

  console.log(decks);

  if (!decks.length) {
    return (
      <ThemedView style={styles.noDecks}>
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          Click on the + to create your first folder and start learning!
        </Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      {decks.map((deck) => (
        <Deck key={deck.id} {...deck} />
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Занимает всю высоту экрана
    justifyContent: "space-between", // Распределяет пространство между элементами
    padding: 16,
  },
  bottomButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  noDecks: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
