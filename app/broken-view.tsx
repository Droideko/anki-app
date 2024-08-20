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
        // justifyContent: "center",
        // alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <Text type="default">BroKenView</Text>
    </ThemedView>
  );
}

export default BroKenView;
