import React from "react";
import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { Text } from "@/src/shared/components/ui/ThemedText";
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
