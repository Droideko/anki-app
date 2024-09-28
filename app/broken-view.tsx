import { Text } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function BroKenView() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text>BroKenView</Text>
    </ThemedView>
  );
}

export default BroKenView;
