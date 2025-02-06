import React, { ElementRef, useRef } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import useFlipCard from '../hooks/useFlipCard';
import { cardWidth } from '../constants';

import CardSide from './CardSide';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { Card } from '@shared/store/useCardsStore';
import { useModalStore } from '@shared/store/useModalStore';
import { useUserStore } from '@shared/store/useUserStore';

interface CardViewProps {
  card: Card;
}

const useGradientColors = (studyProgress: number): [string, string] => {
  const colors = useThemeColor();

  if (studyProgress === 0) {
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
};

export default function CardView({ card }: CardViewProps) {
  const { showModal } = useModalStore();

  const elementRef = useRef<ElementRef<typeof Pressable> | null>(null);

  const onLongPress = (item: Card, flipped: boolean) => {
    console.log('isFlipped.value', flipped);
    elementRef.current?.measureInWindow((x, y, width, height) => {
      const position = { x, y, width, height };
      showModal(position, { ...item, flipped });
    });
  };

  const gradientColors = useGradientColors(card.progress[0].studyProgress);

  const { frontAnimatedStyle, backAnimatedStyle, toggleFlip, isFlipped } =
    useFlipCard();

  return (
    <View style={[styles.cardWrapper, { width: cardWidth }]}>
      <Pressable
        ref={elementRef}
        onLongPress={() => onLongPress(card, isFlipped.value)}
        onPress={toggleFlip}
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
      </Pressable>
    </View>
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
