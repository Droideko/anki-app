import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useModalStore } from '@shared/store/useModalStore';
import { Text } from '@shared/components/ui/ThemedText';

function DeckModalMenuContent() {
  const { error } = useThemeColor();
  const { hideModal, showDeleteModal, selectedItem } = useModalStore();

  const onDelete = () => {
    hideModal();

    showDeleteModal(selectedItem);
  };

  const onEdit = () => {
    hideModal();

    if (selectedItem === null || selectedItem.type !== 'DECK') {
      return;
    }

    router.push({
      pathname: `/categories/[id]/decks/[deckId]/edit`,
      params: {
        name: selectedItem.name,
        id: String(selectedItem.categoryId),
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
