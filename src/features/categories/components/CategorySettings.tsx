import React from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Divider, Icon, Menu } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

import { useCategoryRepository } from '../hooks/useCategoryRepository';

import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useModalCategoryStore } from '@shared/store/useModalCategoryStore';
import isWeb from '@shared/utils/isWeb';

export default function CategorySettings() {
  const { error, elevation } = useThemeColor();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { isVisible, hideModal } = useModalCategoryStore();
  const { deleteCategory } = useCategoryRepository();

  const onEdit = () => {
    hideModal();

    router.push({
      pathname: `/categories/[id]/edit`,
      params: { id, name },
    });
  };

  const onMove = () => {
    hideModal();
    router.push({
      pathname: `/categories/[id]/move`,
      params: { id, name },
    });
  };

  const onDelete = async () => {
    hideModal();

    if (isWeb()) {
      const discard = confirm('Delete Category?');

      if (discard) {
        await deleteCategory(Number(id));
      }
      router.back();
      return;
    }

    Alert.alert(
      'Delete Category?',
      'Deleting this category will also delete all nested categories and boards. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteCategory(Number(id));
            router.back();
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuAnchor} />
      <Menu
        contentStyle={{
          backgroundColor: elevation.level1,
          paddingTop: 0,
          paddingBottom: 0,
        }}
        visible={isVisible}
        onDismiss={hideModal}
        anchor={<View style={styles.menuAnchor} />}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    right: 45,
  },
  item: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 150,
    padding: 10,
  },
  menuAnchor: {
    height: 1,
    width: 1,
  },
});
