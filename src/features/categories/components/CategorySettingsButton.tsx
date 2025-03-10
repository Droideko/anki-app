import React from 'react';
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useModalCategoryStore } from '@shared/store/useModalCategoryStore';

const MENU_ICON_SIZE = 32;

export default function CategorySettingsButton() {
  const { primary } = useThemeColor();
  const { showModal } = useModalCategoryStore();

  return (
    <IconButton
      iconColor={primary}
      style={styles.iconButton}
      icon="dots-horizontal"
      size={MENU_ICON_SIZE}
      onPress={showModal}
    />
  );
}

const styles = StyleSheet.create({
  iconButton: { height: MENU_ICON_SIZE, margin: 0, width: MENU_ICON_SIZE },
});
