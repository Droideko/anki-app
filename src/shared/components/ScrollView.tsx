import React, { PropsWithChildren } from 'react';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  ScrollView as ReactScrollView,
  ScrollViewProps as RNScrollViewProps,
} from 'react-native';

import { ThemedView } from '@shared/components/ui/ThemedView';

type ScrollViewProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}> &
  Omit<RNScrollViewProps, 'style' | 'contentContainerStyle' | 'children'>;

export default function ScrollView({
  children,
  style,
  ...scrollViewProps
}: ScrollViewProps) {
  return (
    <ThemedView style={[styles.container, style]}>
      <ReactScrollView
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        {...scrollViewProps}
      >
        {children}
      </ReactScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
});
