import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";

export function SafeThemedView({ children }: { children: React.ReactNode }) {
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
      {children}
    </ThemedView>
  );
}
