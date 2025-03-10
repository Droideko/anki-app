import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { useLocalSearchParams } from 'expo-router';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import DeckCard from './DeckCard';

import { Text } from '@shared/components/ui/ThemedText';
import { Card } from '@shared/store/useCardsStore';

export type PartialWithRequiredKeys<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>;

type CardWithCardId = Card & { cardId: number };

export interface CardFormValues {
  deckId: number;
  cards: PartialWithRequiredKeys<CardWithCardId, 'front' | 'back'>[];
}

interface DeckCardsContainerProps {
  fields: FieldArrayWithId<CardFormValues, 'cards', 'id'>[];
  control: Control<CardFormValues>;
  onEdit: () => void;
  onAddCard: () => void;
  onRemoveCard: (index: number) => void;
}

function RightAction(progress: SharedValue<number>, drag: SharedValue<number>) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // transform: [{ translateX: drag.value / 2 }],
      opacity: drag.value < 0 ? Math.min(-drag.value / 80, 1) : 0,
    };
  });

  return (
    <Animated.View style={[styles.rightAction, animatedStyle]}>
      <Text style={styles.actionText}>🗑</Text>
    </Animated.View>
  );
}

export function DeckCardsContainer({
  fields,
  control,
  onEdit,
  onAddCard,
  onRemoveCard,
}: DeckCardsContainerProps) {
  const { action, cardId } = useLocalSearchParams<{
    action?: 'add' | 'edit';
    cardId?: string;
  }>();

  const getAutoFocus = (
    item: FieldArrayWithId<CardFormValues, 'cards', 'id'>,
    index: number,
  ): boolean | undefined => {
    if (action === 'add') {
      return index === fields.length - 1;
    }
    if (action === 'edit' && item.cardId) {
      return Number(cardId) === item.cardId;
    }
  };

  return (
    <FlatList
      data={fields}
      contentContainerStyle={styles.listContent}
      keyExtractor={(item, index) =>
        item.id ? `id-${item.id}` : `new-${index}`
      }
      renderItem={({ item, index }) => (
        <ReanimatedSwipeable
          enableTrackpadTwoFingerGesture
          renderRightActions={RightAction}
          rightThreshold={40}
          leftThreshold={1000}
          overshootRight={false}
          onSwipeableOpen={(direction) => {
            if (direction === 'right') {
              onRemoveCard(index);
            }
          }}
        >
          <DeckCard
            control={control}
            index={index}
            autoFocus={getAutoFocus(item, index)}
            onEdit={onEdit}
          />
        </ReanimatedSwipeable>
      )}
      ListFooterComponent={
        <Pressable style={styles.addButton} onPress={onAddCard}>
          <Text style={styles.addButtonText}>Add card</Text>
        </Pressable>
      }
    />
  );
}

export default DeckCardsContainer;

const styles = StyleSheet.create({
  actionText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: 'red',
    padding: 6,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 55,
    padding: 20,
  },
  rightAction: {
    alignItems: 'center',
    backgroundColor: '#dd2c00',
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    marginBottom: 8,
    width: 100,
    // Если нужно, задайте явную высоту, совпадающую с высотой карточки
  },
});
