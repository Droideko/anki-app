import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import CreateIconButton from '@shared/components/CreateIconButton';
import { WaveIconWrapper } from '@shared/components/WaveIconWrapper';

const ICON_SIZE = 50;

interface WaveButtonProps {
  href: string;
  style?: StyleProp<ViewStyle>;
}

function WaveButton({ href, style }: WaveButtonProps) {
  return (
    <WaveIconWrapper
      style={styles.iconWrapper}
      isActivePulse={true}
      iconSize={ICON_SIZE} // было бы хорошо убрать от привязки size и чтобы он автоматически вычислял границы анимации
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
