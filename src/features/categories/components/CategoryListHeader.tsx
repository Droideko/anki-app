import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ListItem } from '../types';

import { Text } from '@shared/components/ui/ThemedText';
import { useThemeColor } from '@shared/hooks/useThemeColor';

export default function CategoryListHeader({
  item,
}: {
  item: Extract<ListItem, { type: 'header' }>;
}) {
  const { background } = useThemeColor();

  return (
    <View style={[styles.headerContainer, { backgroundColor: background }]}>
      <Text variant="bodyLarge" style={styles.headerText}>
        {item.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    // borderBlockColor: 'red',
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
