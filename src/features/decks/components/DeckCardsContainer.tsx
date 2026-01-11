import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import DeckCard from './DeckCard';

import { Text } from '@shared/components/ui/ThemedText';
import { Card } from '@shared/store/useCardsStore';
import { PartialWithRequiredKeys } from '@shared/types/global';
import SwiperDelete from '@shared/components/SwiperDelete';

type CardWithCardId = Card & { cardId: number };

export interface CardFormValues {
  deckId: number;
  cards: PartialWithRequiredKeys<CardWithCardId, 'front' | 'back' | 'cardId'>[];
}

interface DeckCardsContainerProps {
  fields: FieldArrayWithId<CardFormValues, 'cards', 'id'>[];
  control: Control<CardFormValues>;
  onEdit: () => void;
  onAddCard: () => void;
  onRemoveCard: (index: number) => void;
  onAddExample: (cardId: number | string) => void;
}

export function DeckCardsContainer({
  fields,
  control,
  onEdit,
  onAddCard,
  onRemoveCard,
  onAddExample,
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
          renderRightActions={SwiperDelete}
          rightThreshold={40}
          leftThreshold={1000}
          overshootRight={false}
          onSwipeableOpen={(direction) => {
            console.log('onSwipeableOpen', direction);
            if (direction === 'left') {
              onRemoveCard(index);
            }
          }}
        >
          <DeckCard
            control={control}
            index={index}
            namePrefix="cards"
            autoFocus={getAutoFocus(item, index)}
            onEdit={onEdit}
            onAddExample={() => onAddExample(item.cardId)}
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
  addButton: { backgroundColor: 'red', padding: 6 },
  addButtonText: { color: '#fff', textAlign: 'center' },
  listContent: { paddingBottom: 55, padding: 20 },
});
