import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon, Switch } from 'react-native-paper';

import { useCardsRepository } from '../hooks/useCardsRepository';

import { Text } from '@shared/components/ui/ThemedText';
import { useReviewStore } from '@shared/store/useReviewStore';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';

interface ExampleSwitchProps {
  leftText: string;
  style?: StyleProp<ViewStyle>;
}

export default function ReverseSwitch({ style, leftText }: ExampleSwitchProps) {
  const currentCardId = useReviewStore((state) => state.currentCardId);

  const changedCards = useReviewStore((state) => state.changedCards);
  const setChangedCard = useReviewStore((state) => state.setChangedCard);
  const currentChangedCard = changedCards[String(currentCardId) ?? ''];

  const { reverseCard } = useCardsRepository();
  const isReversedCard = currentChangedCard?.isReversed ?? false;

  const [{ loading }, setReverseCard] = useAsyncFn(async () =>
    reverseCard(Number(currentCardId)),
  );

  const handleReverseCard = async () => {
    if (loading) return;
    if (currentCardId === null) {
      console.error('No card selected');
      return;
    }
    setChangedCard(currentCardId, { isReversed: !isReversedCard });
    await setReverseCard();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <Icon source="swap-horizontal" size={16} />
        <Text variant="bodyLarge">{leftText}</Text>
      </View>
      <Switch value={isReversedCard} onValueChange={handleReverseCard} />
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
