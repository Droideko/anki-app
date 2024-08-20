import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { Text } from "@/components/ThemedText";
import { Stack, useLocalSearchParams } from "expo-router";

const Options = () => {
  const { id, optionId, user } = useLocalSearchParams();

  return (
    <ThemedView>
      <Stack.Screen
        options={{ headerTitle: `Details ${id} Option ${optionId}` }}
      />
      <Text>Options {user} </Text>
    </ThemedView>
  );
};

export default Options;
