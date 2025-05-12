import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useFieldArray, useForm } from 'react-hook-form';
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

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

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

  const { cardsById } = useCardsStore();
  console.log('cardsById: ', cardsById);
  const examples = cardsById[Number(cardId)]?.examples || [];
  console.log('examples: ', examples);

  const { control, handleSubmit } = useForm<ExampleFormValues>({
    defaultValues: {
      deckId: Number(deckId),
      examples: examples?.map((ex) => ({ ...ex, exampleId: ex.id })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'examples',
  });

  const onAddCard = () => {
    const tempId = nanoid();
    // setUnsavedChanges(true);
    append({ front: '', back: '', exampleId: nanoid() });
  };

  const onSubmit = async (formData: ExampleFormValues) => {};

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          //   headerTitle: () => <GenerateButton deckId={deckId} />,
          headerBackTitle: '',
          //   headerLeft: (props) => (
          //     <HeaderBackButton
          //       style={styles.button}
          //       {...props}
          //       onPress={() => router.back()}
          //     />
          //   ),
          headerRight: () => (
            <ThemedIconButton icon="check" onPress={() => {}} />
          ),
        }}
      />
      <ThemedView style={styles.container}>
        <KeyboardAvoidingContainer>
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
                  if (direction === 'right') {
                    // onRemoveCard(index);
                  }
                }}
              >
                <DeckCard
                  namePrefix="examples"
                  control={control}
                  index={index}
                  // autoFocus={true}
                  // onEdit={onEdit}
                />
              </ReanimatedSwipeable>
            )}
            ListFooterComponent={
              <Pressable style={styles.addButton} onPress={onAddCard}>
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
  container: {
    flex: 1,
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
