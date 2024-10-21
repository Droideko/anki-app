import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { ThemedView } from "@/src/shared/components/ui/ThemedView";
import { PropsWithChildren } from "react";

type ScrollViewProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export default function ScrollView({ children, style }: ScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ThemedView style={[styles.container, style]}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    overflow: "hidden",
  },
});
