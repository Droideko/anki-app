import React, { useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';

import { useCardsRepository } from '../hooks/useCardsRepository';
import useShowExamples from '../hooks/useShowExamples';

import GeneratedButtons from './GeneratedButtons';

// import { GeneratedCard } from '@shared/api/openaiService';
import { Text } from '@shared/components/ui/ThemedText';
import CardCheckbox from '@shared/components/CardCheckbox';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { UpdateCardDto } from '@shared/api/deckService';
import { useFormStore } from '@shared/store/useGenerateFormStore';
import { Card } from '@shared/api/openaiService';
import { CardFormValues } from './DeckCardsContainer';

type CreatedCardFormValues = {
  deckId: number;
  cards: {
    selected: boolean; // сама карточка
    examples: boolean[]; // её примеры
  }[];
};

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

  const [{ loading }, sendData] = useAsyncFn(
    async (deckId: number, cards: UpdateCardDto[]) => {
      return updateCards(deckId, { cards });
    },
    [],
  );

  const { expandedStates, handleExpandChange, allOpen, toggleAllExamples } =
    useShowExamples(cards);

  // console.log(cards);
  // console.log('w', usedPhrases);
  // const {
  //   control: parentControl,
  //   /* setValue, etc. */
  // } = useFormContext<CardFormValues>();

  // const { append: appendCard } = useFieldArray({
  //   control: parentControl,
  //   name: 'cards',
  // });

  useEffect(() => {
    const frontCards = cards.map((card) => card.front);
    addPhrases(frontCards);
  }, [cards, addPhrases]);

  const onSubmit = async (data: CreatedCardFormValues) => {
    const selectedCards: UpdateCardDto[] = data.cards.reduce<UpdateCardDto[]>(
      (acc, flags, i) => {
        if (!flags.selected) {
          return acc;
        }

        const card = cards[i];
        const filteredExamples = (card.examples ?? []).filter(
          (_, exampleIndex) => flags.examples[exampleIndex],
        );

        acc.push({
          front: card.front,
          back: card.back,
          examples: filteredExamples.length ? filteredExamples : [],
        } satisfies UpdateCardDto);

        return acc;
      },
      [],
    );

    await sendData(data.deckId, selectedCards);

    // 2) добавляем в форму, чтобы сразу увидеть их в create.tsx
    // selected.forEach(
    //   (c) => appendCard({ ...c, cardId: nanoid() }), // cardId нужен для key
    // );

    // Нужно добавить в форму которая будет находиться в layout.tsx

    router.back();
    // router.dismiss(2);
  };

  const hasExamples = useMemo(() => {
    return cards.some((card) => Number(card.examples?.length) > 0);
  }, [cards]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
  buttonContent: {
    padding: 0,
  },
  listContent: {
    paddingBottom: 60,
    paddingHorizontal: 12,
  },
});
