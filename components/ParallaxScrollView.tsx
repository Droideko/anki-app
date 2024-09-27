import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedRef } from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { PropsWithChildren } from "react";

type ParallaxScrollViewProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

export default function ParallaxScrollView({
  children,
  style,
}: ParallaxScrollViewProps) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  return (
    <ThemedView style={styles.container}>
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
