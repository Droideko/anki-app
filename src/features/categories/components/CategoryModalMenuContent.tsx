import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

import { useCategoryRepository } from '../hooks/useCategoryRepository';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useModalStore } from '@shared/store/useModalStore';
import { Text } from '@shared/components/ui/ThemedText';
import isWeb from '@shared/utils/isWeb';

function CategoryModalMenuContent() {
  const { error } = useThemeColor();
  const { hideModal, selectedItem } = useModalStore();
  const { deleteCategory } = useCategoryRepository();
  const { id } = useLocalSearchParams<{ id: string }>();

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

  const onEdit = () => {
    hideModal();

    if (selectedItem === null || selectedItem.type !== 'CATEGORY') {
      return;
    }

    router.push({
      pathname: `/categories/[id]/edit`,
      params: {
        name: selectedItem.name,
        id: String(selectedItem.id),
      },
    });
  };

  return (
    <>
      <Pressable style={styles.item} onPress={onEdit}>
        <Text variant="bodyMedium">Edit</Text>
        <Icon size={25} source="pencil" />
      </Pressable>
      <Divider />
      <Pressable style={styles.item} onPress={onDelete}>
        <Text variant="bodyMedium" style={{ color: error }}>
          Delete
        </Text>
        <Icon size={25} source="delete" color={error} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default CategoryModalMenuContent;
