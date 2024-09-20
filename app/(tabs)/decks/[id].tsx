import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

function DeckItem() {
  const { id } = useLocalSearchParams();

  // get Information from Server or Storage (SQLLite)
  

  return (
    <ThemedView>
      <Stack.Screen options={{ headerTitle: `Deck #${id}` }} />
      <Text>Deck - {id}</Text>
    </ThemedView>
  );
}

export default DeckItem;
