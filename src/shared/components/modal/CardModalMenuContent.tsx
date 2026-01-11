import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useModalStore } from '@shared/store/useModalStore';
import { Text } from '@shared/components/ui/ThemedText';
import { useSelectStore } from '@shared/store/useSelectStore';
import { useCardsRepository } from '@features/decks/hooks/useCardsRepository';

function CardModalMenuContent() {
  const { error } = useThemeColor();
  const { hideModal, selectedItem } = useModalStore();
  const { removeCard, reverseCard } = useCardsRepository();
  const { selectCard } = useSelectStore();

  const { deckId } = useLocalSearchParams<{
    id: string;
    deckId: string;
  }>();

  const onDelete = async () => {
    if (selectedItem === null) {
      return;
    }

    try {
      await removeCard(selectedItem.id);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      hideModal();
    }
  };

  const onEdit = () => {
    hideModal();

    if (selectedItem === null) {
      return;
    }

    router.push({
      pathname: `/deck/[deckId]/card/create`,
      params: {
        deckId: deckId,
        action: 'edit',
        cardId: selectedItem.id,
      },
    });
  };

  const onReverse = async () => {
    if (!selectedItem) return;

    try {
      await reverseCard(selectedItem.id);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      hideModal();
    }
  };

  const onSelect = () => {
    if (!selectedItem) return;

    hideModal();
    selectCard(selectedItem.id);
  };

  return (
    <>
      <Pressable style={styles.item} onPress={onSelect}>
        <Text variant="bodyMedium">Select</Text>
        <Icon size={25} source="check-circle-outline" />
      </Pressable>
      <Pressable style={styles.item} onPress={onEdit}>
        <Text variant="bodyMedium">Edit</Text>
        <Icon size={25} source="pencil" />
      </Pressable>
      <Pressable style={styles.item} onPress={onReverse}>
        <Text variant="bodyMedium">Reverse</Text>
        <Icon size={25} source="swap-horizontal" />
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

export default CardModalMenuContent;
