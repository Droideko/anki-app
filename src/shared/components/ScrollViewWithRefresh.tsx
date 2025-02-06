import React, { PropsWithChildren } from 'react';
import {
  StyleProp,
  ViewStyle,
  RefreshControl,
  RefreshControlProps,
} from 'react-native';

import ScrollView from './ScrollView';

type ScrollViewProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
  refreshControlProps?: Omit<RefreshControlProps, 'refreshing' | 'onRefresh'>;
}>;

export default function ScrollViewWithRefresh({
  children,
  style,
  refreshing = false,
  onRefresh,
  refreshControlProps,
  ...restProps
}: ScrollViewProps) {
  return (
    <ScrollView
      style={style}
      refreshControl={
        refreshing !== undefined && onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            {...refreshControlProps}
          />
        ) : undefined
      }
      {...restProps}
    >
      {children}
    </ScrollView>
  );
}
