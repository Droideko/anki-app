import { Stack } from "expo-router";
import React from "react";

function DecksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-deck"
        options={{ headerShown: false, presentation: "modal" }}
      />
      {/* <Stack.Screen
        name="[id]"
        options={{ headerShown: true, headerTitle: "Deck" }}
      /> */}
    </Stack>
  );
}

export default DecksLayout;
