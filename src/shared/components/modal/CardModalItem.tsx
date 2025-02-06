import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Card, Text } from 'react-native-paper';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { CardWithFlipped, useModalStore } from '@shared/store/useModalStore';

interface SubcategoryCardProps {
  item: CardWithFlipped;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

function CardModalItem({ item, style, onPress }: SubcategoryCardProps) {
  const { border, elevation, onSurface } = useThemeColor();
  const { elementPosition } = useModalStore();

  return (
    <Card
      onPress={onPress}
      mode="elevated"
      style={[
        {
          height: elementPosition!.height,
          borderBlockEndColor: border,
          backgroundColor: elevation.level1,
          top: elementPosition!.y,
          left: elementPosition!.x,
          width: elementPosition!.width,
        },
        styles.card,
        style,
      ]}
    >
      <Text
        style={[styles.text, { color: onSurface }]}
        numberOfLines={3}
        ellipsizeMode="tail"
      >
        {item.flipped ? item.back : item.front}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    position: 'absolute',
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CardModalItem;
