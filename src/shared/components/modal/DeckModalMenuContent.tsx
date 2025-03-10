import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import { router } from 'expo-router';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useModalStore } from '@shared/store/useModalStore';
import { Text } from '@shared/components/ui/ThemedText';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import isWeb from '@shared/utils/isWeb';

function DeckModalMenuContent() {
  const { error } = useThemeColor();
  const { hideModal, showDeleteModal, selectedItem } = useModalStore();
  const { deleteDeck } = useCategoryRepository();

  const onDelete = async () => {
    hideModal();

    if (isWeb()) {
      const discard = confirm('Delete Deck?');

      if (discard) {
        await deleteDeck(Number(selectedItem?.id));
      }
    }

    Alert.alert(
      'Delete Deck?',
      'Deleting this deck will also delete all nested cards. This action cannot be undone.',
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
            await deleteDeck(Number(selectedItem?.id));
          },
        },
      ],
    );

    // showDeleteModal(selectedItem);
  };

  const onEdit = () => {
    hideModal();

    if (selectedItem === null || selectedItem.type !== 'DECK') {
      return;
    }

    router.push({
      pathname: `/categories/deck-edit`,
      params: {
        name: selectedItem.name,
        deckId: String(selectedItem.id),
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

export default DeckModalMenuContent;
