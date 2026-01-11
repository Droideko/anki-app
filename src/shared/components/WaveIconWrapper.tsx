import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { WaveCircle } from './WaveCircle';

interface OwnProps {
  children: React.ReactNode;
  isActivePulse: boolean;
  style?: StyleProp<ViewStyle>;
  iconSize: number;
}

export function WaveIconWrapper({
  children,
  isActivePulse,
  style,
  iconSize,
}: OwnProps) {
  return (
    <View style={[styles.container, style]}>
      {isActivePulse && <WaveCircle iconSize={iconSize} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
