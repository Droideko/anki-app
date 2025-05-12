import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon, Switch } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import { Text } from '@shared/components/ui/ThemedText';
import { useCategoriesStore } from '@shared/store/useCategoriesStore';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { useOptimistic } from '@shared/hooks/useOptimistic';

interface OnlyBackSwitchProps {
  leftText: string;
  style?: StyleProp<ViewStyle>;
}

export default function OnlyBackSwitch({
  style,
  leftText,
}: OnlyBackSwitchProps) {
  const { updateDeck } = useCategoryRepository();
  const { decksById } = useCategoriesStore();
  const { deckId } = useLocalSearchParams<{
    deckId: string;
  }>();

  const currentDeck = decksById[Number(deckId)];

  const [switchValue, updateSwitchValue] = useOptimistic(
    currentDeck.showOnlyBackSound,
    async (newValue) => {
      await updateDeck(Number(deckId), { showOnlyBackSound: newValue });
    },
  );

  const handleToggle = async () => await updateSwitchValue(!switchValue);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Icon source="music-note" size={16} />
        <Text variant="bodyLarge">{leftText}</Text>
      </View>
      <Switch value={switchValue} onValueChange={handleToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
