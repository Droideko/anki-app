import React, { ElementRef, memo, useMemo, useRef } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useShallow } from 'zustand/react/shallow';

import useFlipCard from '../hooks/useFlipCard';
import { cardWidth } from '../constants';

import CardSide from './CardSide';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Card } from '@shared/store/useCardsStore';
import { useModalStore } from '@shared/store/useModalStore';
import { useProgressStore } from '@shared/store/useProgressStore';
import { Text } from '@shared/components/ui/ThemedText';
import { useSelectStore } from '@shared/store/useSelectStore';

interface CardViewProps {
  card: Card;
  // selected: boolean;
  // onSelect: () => void;
  // selectionMode: boolean;
}

const useGradientColors = (
  studyProgress: number,
  selected: boolean,
): [string, string] => {
  const colors = useThemeColor();

  return useMemo(() => {
    if (selected) {
      return [colors.primary, colors.primary];
    } else if (studyProgress === 0) {
      return [colors.primaryContainer, colors.onPrimaryContainer];
    } else if (studyProgress <= 20) {
      return [colors.error, colors.errorContainer];
    } else if (studyProgress <= 40) {
      return ['rgb(143, 83, 75)', 'rgb(191, 145, 131)']; // условно "предупреждающие"
    } else if (studyProgress <= 60) {
      return ['rgb(110, 118, 87)', 'rgb(128, 110, 90)']; // условно "предупреждающие"
    } else if (studyProgress <= 80) {
      return ['rgb(76, 152, 100)', 'rgb(64, 75, 50)']; // условно "предупреждающие"
    } else {
      return [colors.success, colors.onSuccess];
    }
  }, [colors, studyProgress, selected]);
};

function CardContent({
  card,
  selectionMode,
  selected,
}: {
  card: Card;
  selected: boolean;
  selectionMode: boolean;
}) {
  const showModal = useModalStore((state) => state.showModal);
  const progressByCardId = useProgressStore((state) => state.progressByCardId);
  const studyProgress = progressByCardId[card.id]?.studyProgress ?? 0;

  const selectCard = useSelectStore((state) => state.selectCard);

  const elementRef = useRef<ElementRef<typeof Pressable> | null>(null);

  const onLongPress = (item: Card, flipped: boolean) => {
    elementRef.current?.measureInWindow((x, y, width, height) => {
      const position = { x, y, width, height };
      showModal(position, { ...item, flipped });
    });
  };

  const gradientColors = useGradientColors(studyProgress, selected);

  const { frontAnimatedStyle, backAnimatedStyle, toggleFlip, isFlipped } =
    useFlipCard();

  const onPress = () => {
    return selectionMode ? selectCard(card.id) : toggleFlip();
  };

  return (
    <View style={[styles.cardWrapper, { width: cardWidth }]}>
      <Pressable
        ref={elementRef}
        onLongPress={() => onLongPress(card, isFlipped)}
        onPress={onPress}
        style={styles.pressable}
      >
        <CardSide
          text={card.front}
          gradientColors={gradientColors}
          animatedStyles={[frontAnimatedStyle]}
        />
        <CardSide
          text={card.back}
          gradientColors={gradientColors}
          animatedStyles={[styles.backCard, backAnimatedStyle]}
        />
        <View style={{ position: 'absolute', right: 5, top: 5 }}>
          <Checkbox status={selected ? 'checked' : 'unchecked'} />
        </View>
      </Pressable>
    </View>
  );
}

const CardContentMemo = memo(CardContent);

export default function CardView({ card }: CardViewProps) {
  const selectedCards = useSelectStore((state) => state.selectedCards);
  const selectionMode = selectedCards.length > 0;
  const selected = selectedCards.includes(card.id);

  return (
    <CardContentMemo
      card={card}
      selected={selected}
      selectionMode={selectionMode}
    />
  );
}

const styles = StyleSheet.create({
  backCard: {
    transform: [{ rotateY: '180deg' }],
  },
  cardWrapper: {
    aspectRatio: 1.4,
    marginBottom: 8,
    marginTop: 8,
    minHeight: 100,
  },
  pressable: {
    flex: 1,
  },
});
