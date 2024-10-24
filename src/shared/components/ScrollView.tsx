import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedRef } from 'react-native-reanimated';
import { PropsWithChildren } from 'react';

import { ThemedView } from '@shared/components/ui/ThemedView';

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
    overflow: 'hidden',
    padding: 20,
  },
});
