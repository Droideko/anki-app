import React, { useEffect, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { customAlphabet } from 'nanoid/non-secure';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import { ThemedView } from '@shared/components/ui/ThemedView';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
import { Example, useCardsStore } from '@shared/store/useCardsStore';
import SwiperDelete from '@shared/components/SwiperDelete';
import { Text } from '@shared/components/ui/ThemedText';
import DeckCard from '@features/decks/components/DeckCard';
import { PartialWithRequiredKeys } from '@shared/types/global';
import { CardWithCardId } from '@features/review/types';
import { CardFormValues } from '@features/decks/components/DeckCardsContainer';

// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
const nanoidNumeric = customAlphabet('0123456789', 10);

type ExampleWithExampleId = Example & { exampleId: number | string };

interface ExampleFormValues {
  deckId: number;
  examples: PartialWithRequiredKeys<ExampleWithExampleId, 'front' | 'back'>[]; //ExampleWithExampleId[];
}

export default function AddExample() {
  const { deckId, cardId } = useLocalSearchParams<{
    deckId: string;
    cardId: string;
  }>();

  // const { cardsById } = useCardsStore();
  // console.log('cardsById: ', cardsById);
  // const examples = cardsById[Number(cardId)]?.examples || [];
  // console.log('examples: ', examples);

  // const { control, handleSubmit } = useForm<ExampleFormValues>({
  //   defaultValues: {
  //     deckId: Number(deckId),
  //     examples: examples?.map((ex) => ({ ...ex, exampleId: ex.id })) || [],
  //   },
  // });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'examples',
  // });

  // const onAddCard = () => {
  //   const tempId = nanoid();
  //   // setUnsavedChanges(true);
  //   append({ front: '', back: '', exampleId: nanoid() });
  // };

  const { control, getValues, handleSubmit } = useFormContext<CardFormValues>();

  /** 1. Находим индекс карточки, с которой работаем */
  const cardIndex = useMemo(() => {
    return getValues('cards').findIndex(
      (card) => Number(card.cardId) === Number(cardId),
    );
  }, [cardId, getValues]);

  // const onSubmit = async (formData: ExampleFormValues) => {};

  const { fields, append, remove } = useFieldArray({
    control,
    name: `cards.${cardIndex}.examples` as const,
  });

  console.log('fields', fields);

  useEffect(() => {
    const lastField = fields[fields.length - 1];
    if (lastField && lastField.front === '' && lastField.back === '') {
      return;
    }
    append({ front: '', back: '', id: Number(nanoidNumeric()) });
  }, [append, fields]);

  const handleAddExample = () => {
    append({ front: '', back: '', id: Number(nanoidNumeric()) });
  };

  const onDone = handleSubmit(() => router.back());

  const onRemoveExample = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackTitle: '',
          headerRight: () => (
            <ThemedIconButton
              icon="check"
              onPress={() => {
                onDone();
              }}
            />
          ),
        }}
      />
      <ThemedView style={styles.container}>
        <KeyboardAvoidingContainer>
          <FlatList
            data={fields}
            contentContainerStyle={styles.listContent}
            // keyExtractor={(itez, index) =>
            //   item.id ? `id-${item.id}` : `new-${index}`
            // }
            renderItem={({ item, index }) => (
              <ReanimatedSwipeable
                enableTrackpadTwoFingerGesture
                renderRightActions={SwiperDelete}
                rightThreshold={40}
                leftThreshold={1000}
                overshootRight={false}
                onSwipeableOpen={(direction) => {
                  if (direction === 'left') {
                    remove(index);
                  }
                }}
              >
                <DeckCard<CardFormValues>
                  namePrefix={`cards.${cardIndex}.examples`}
                  // namePrefix="examples"
                  control={control}
                  index={index}
                  // autoFocus={index === fields.length - 1}
                  // autoFocus={true}
                  // onEdit={onEdit}
                />
              </ReanimatedSwipeable>
            )}
            ListFooterComponent={
              <Pressable style={styles.addButton} onPress={handleAddExample}>
                <Text style={styles.addButtonText}>Add example</Text>
              </Pressable>
            }
          />
        </KeyboardAvoidingContainer>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  actionText: { color: '#fff', fontSize: 24, fontWeight: '600' },
  addButton: { backgroundColor: 'red', padding: 6 },
  addButtonText: { color: '#fff', textAlign: 'center' },
  container: { flex: 1 },
  listContent: { paddingBottom: 55, padding: 20 },
  rightAction: {
    alignItems: 'center',
    backgroundColor: '#dd2c00',
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    marginBottom: 8,
    width: 100,
  },
});
