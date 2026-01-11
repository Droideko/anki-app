import React, { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { customAlphabet } from 'nanoid/non-secure';

import { useCardsRepository } from '../hooks/useCardsRepository';
import useShowExamples from '../hooks/useShowExamples';

// import { GeneratedCard } from '@shared/api/openaiService';
import { CreatedCardFormValues } from '../types';
import getSelectedCards from '../utils/getSelectedCards';

import GeneratedButtons from './GeneratedButtons';
import { CardFormValues } from './DeckCardsContainer';

import { Text } from '@shared/components/ui/ThemedText';
import CardCheckbox from '@shared/components/CardCheckbox';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { UpdateCardDto } from '@shared/api/deckService';
import { useFormStore } from '@shared/store/useGenerateFormStore';
import { Card } from '@shared/api/openaiService';

const nanoidNumeric = customAlphabet('0123456789', 10);

interface CreatedCardsProps {
  cards: Card[];
  onGenerate: () => void;
}

function CreatedCards({ cards, onGenerate }: CreatedCardsProps) {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { control, handleSubmit } = useForm<CreatedCardFormValues>({
    defaultValues: {
      deckId: Number(deckId),
      cards: cards.map((c) => ({
        selected: true,
        examples: Array(c.examples?.length ?? 0).fill(true),
      })),
    },
  });

  const { updateCards } = useCardsRepository();
  const { addPhrases, usedPhrases } = useFormStore();

  // const [{ loading }, sendData] = useAsyncFn(
  //   async (deckId: number, cards: UpdateCardDto[]) => {
  //     return updateCards(deckId, { cards });
  //   },
  //   [],
  // );

  const { expandedStates, handleExpandChange, allOpen, toggleAllExamples } =
    useShowExamples(cards);

  const { control: parentControl } = useFormContext<CardFormValues>();

  // const { append: appendCard } = useFieldArray({
  //   control: parentControl,
  //   name: 'cards',
  // });

  const { getValues, setValue } = useFormContext<CardFormValues>();

  useEffect(() => {
    const frontCards = cards.map((card) => card.front);
    addPhrases(frontCards);
  }, [cards, addPhrases]);

  const hasExamples = useMemo(() => {
    return cards.some((card) => Number(card.examples?.length) > 0);
  }, [cards]);

  const onSubmit = async (formValues: CreatedCardFormValues) => {
    const selectedCards = getSelectedCards(formValues, cards);

    // const t = await sendData(formValues.deckId, selectedCards);

    const current = getValues('cards');

    const toInsert = selectedCards.map((card) => ({
      front: card.front,
      back: card.back,
      cardId: Number(nanoidNumeric()), // временный id
      examples: card.examples ?? [],
    }));

    /* кладём обратно — одно действие */
    setValue('cards', [...current, ...toInsert], { shouldDirty: true });

    // selectedCards.forEach((card) =>
    //   appendCard({
    //     cardId: Number(nanoidNumeric()), // временный id
    //     front: card.front,
    //     back: card.back,
    //     examples: card.examples ?? [],
    //   }),
    // );

    router.back();
  };

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  return (
    <>
      <View style={{ flex: 1 }}>
        <GeneratedButtons
          onGenerate={onGenerate}
          onToggleExamples={toggleAllExamples}
          allOpen={allOpen}
          hasExamples={hasExamples}
        />
        <FlatList
          data={cards}
          contentContainerStyle={styles.listContent}
          renderItem={({ item: card, index }) => (
            <CardCheckbox
              card={card}
              control={control}
              index={index}
              expanded={expandedStates[index]}
              onExpandChange={handleExpandChange}
            />
          )}
        />
        <ThemedButton
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          contentStyle={styles.buttonContent}
          style={styles.button}
        >
          <Text>Save</Text>
        </ThemedButton>
      </View>
    </>
  );
}

export default CreatedCards;

const styles = StyleSheet.create({
  button: {
    bottom: 0,
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: '-50%' }],
    width: '40%',
  },
  buttonContent: { padding: 0 },
  listContent: { paddingBottom: 60, paddingHorizontal: 12 },
});
