import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Divider, Icon } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { useModalStore } from '@shared/store/useModalStore';
import { Text } from '@shared/components/ui/ThemedText';

function CategoryModalMenuContent() {
  const { error } = useThemeColor();
  const { hideModal, showDeleteModal, selectedCategory } = useModalStore();

  const onDelete = () => {
    hideModal();
    showDeleteModal(selectedCategory);
  };

  return (
    <>
      <Pressable style={styles.item} onPress={() => {}}>
        <Text variant="bodyMedium">Share</Text>
        <Icon size={25} source="share-variant" />
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
