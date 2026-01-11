import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';

const MENU_ICON_SIZE = 32;

function DotsIconButton({ onPress }: { onPress: () => void }) {
  const { primary } = useThemeColor();

  return (
    <IconButton
      iconColor={primary}
      style={styles.iconButton}
      icon="dots-horizontal"
      size={MENU_ICON_SIZE}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: { height: MENU_ICON_SIZE, margin: 0, width: MENU_ICON_SIZE },
});

export default DotsIconButton;
