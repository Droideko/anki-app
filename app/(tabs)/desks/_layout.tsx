import { Stack } from "expo-router";
import React from "react";

function DesksLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Desks" }} />
    </Stack>
  );
}

export default DesksLayout;
