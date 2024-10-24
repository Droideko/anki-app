import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedView } from '@shared/components/ui/ThemedView';

export function SafeThemedView({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
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
