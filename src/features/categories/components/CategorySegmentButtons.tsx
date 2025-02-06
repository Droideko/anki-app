import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, Icon, Menu } from 'react-native-paper';
import { router } from 'expo-router';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
import { useModalStore } from '@shared/store/useModalStore';
import { Text } from '@shared/components/ui/ThemedText';
import { NormalizedCategory } from '@shared/types/category';

const MENU_ICON_SIZE = 32;

interface CategorySegmentButtonsProps {
  item: NormalizedCategory;
  hideMenu?: {
    viewAll: boolean;
  };
}

const CategorySegmentButtons = ({
  item,
  hideMenu = { viewAll: false },
}: CategorySegmentButtonsProps) => {
  const { error, elevation } = useThemeColor();
  const [visible, setVisible] = useState(false);
  const { showDeleteModal } = useModalStore();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onViewAll = () => {
    closeMenu();
    router.push({
      pathname: `/categories/[id]`,
      params: { name: item.name, id: String(item.id) },
    });
  };

  const onDelete = () => {
    closeMenu();
    showDeleteModal(item);
  };

  const onEdit = () => {
    closeMenu();
    console.log(item.name, String(item.id));

    router.push({
      pathname: `/categories/[id]/edit`,
      params: { name: item.name, id: String(item.id) },
    });
  };

  const onMove = () => {
    closeMenu();
    router.push({
      pathname: `/categories/[id]/move`,
      params: { name: item.name, id: String(item.id) },
    });
  };

  const onCreate = () => {
    closeMenu();
    router.push({
      pathname: `/categories/[id]/create-deck-or-subcategory`,
      params: { id: String(item.id) },
    });
  };

  return (
    <>
      <Menu
        contentStyle={{
          backgroundColor: elevation.level1,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <ThemedIconButton
            style={styles.iconButton}
            icon="dots-horizontal"
            size={MENU_ICON_SIZE}
            onPress={openMenu}
          />
        }
      >
        {!hideMenu.viewAll && (
          <Pressable style={styles.item} onPress={onViewAll}>
            <Text variant="bodyMedium">View All</Text>
            <Icon size={25} source="view-column-outline" />
          </Pressable>
        )}
        <Pressable style={styles.item} onPress={onCreate}>
          <Text variant="bodyMedium">Create New</Text>
          <Icon size={25} source="plus" />
        </Pressable>
        <Pressable style={styles.item} onPress={onEdit}>
          <Text variant="bodyMedium">Edit</Text>
          <Icon size={25} source="pencil" />
        </Pressable>
        <Pressable style={styles.item} onPress={onMove}>
          <Text variant="bodyMedium">Move</Text>
          <Icon size={25} source="arrow-right-top" />
        </Pressable>
        <Divider />
        <Pressable style={styles.item} onPress={onDelete}>
          <Text variant="bodyMedium" style={{ color: error }}>
            Delete
          </Text>
          <Icon size={25} source="delete" color={error} />
        </Pressable>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  iconButton: { height: MENU_ICON_SIZE, margin: 0, width: MENU_ICON_SIZE },
  item: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 150,
    padding: 10,
  },
});

export default CategorySegmentButtons;
