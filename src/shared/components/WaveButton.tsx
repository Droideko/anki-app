import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Href } from 'expo-router';

import CreateIconButton from '@shared/components/CreateIconButton';
import { WaveIconWrapper } from '@shared/components/WaveIconWrapper';

const ICON_SIZE = 44;

interface WaveButtonProps {
  href: Href;
  isActivePulse: boolean;
  style?: StyleProp<ViewStyle>;
}

function WaveButton({ href, isActivePulse, style }: WaveButtonProps) {
  return (
    <WaveIconWrapper
      style={[styles.iconWrapper, style]}
      isActivePulse={isActivePulse}
      iconSize={ICON_SIZE}
    >
      <CreateIconButton href={href} size={ICON_SIZE} />
    </WaveIconWrapper>
  );
}

export default WaveButton;

const styles = StyleSheet.create({
  iconWrapper: {
    bottom: 0,
    height: 75,
    right: 0,
    width: 75,
  },
});
