import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

function DeskItem() {
  const { id } = useLocalSearchParams();

  return (
    <ThemedView>
      <Stack.Screen options={{ headerTitle: `Desk #${id}` }} />
      <Text>Desk - {id}</Text>
    </ThemedView>
  );
}

export default DeskItem;
