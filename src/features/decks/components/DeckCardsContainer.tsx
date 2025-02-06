import React from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { Control, FieldArrayWithId } from 'react-hook-form';
import { useLocalSearchParams } from 'expo-router';

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
        <DeckCard
          control={control}
          index={index}
          onEdit={onEdit}
          autoFocus={getAutoFocus(item, index)}
          // onRemove={() => onRemoveCard(index)}
        />
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

// export default function DeckCardsContainerRef({
//   onEdit,
// }: DeckCardsContainerProps) {
//   const { deckId, action } = useLocalSearchParams<{
//     deckId: string;
//     action?: string;
//   }>();

//   const { cards } = useFetchDeckCards(Number(deckId));

//   const { control, handleSubmit } = useForm<CardFormValues>({
//     defaultValues: {
//       deckId: Number(deckId),
//       cards: cards,
//     },
//   });

//   const { fields, append } = useFieldArray({
//     control,
//     name: 'cards',
//   });

//   useEffect(() => {
//     if (action === 'add') {
//       append({ front: '', back: '' });
//     }
//   }, [append, action]);

//   const addCard = () => {
//     append({ front: '', back: '' });
//   };

//   // const onSubmit = (data: CardFormValues) => {
//   //   console.log('Отправляем на сервер:', data);
//   // }; // Нужно реализовать в навигации логику

//   return (
//     <>
//       <FlatList
//         data={fields}
//         contentContainerStyle={styles.listContent}
//         keyExtractor={(item, index) => item.id || index.toString()}
//         renderItem={({ item, index }) => (
//           <DeckCard
//             index={index}
//             onEdit={onEdit}
//             control={control}
//             autoFocus={index === fields.length - 1}
//           />
//         )}
//         ListFooterComponent={
//           <Pressable
//             style={{ backgroundColor: 'red', padding: 6 }}
//             onPress={addCard}
//           >
//             <Text style={{ textAlign: 'center' }}>Add card</Text>
//           </Pressable>
//         }
//       />
//     </>
//   );
// }

const styles = StyleSheet.create({
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
});
