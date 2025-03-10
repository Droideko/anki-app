import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';

import { useCardsRepository } from '../hooks/useCardsRepository';

import GeneratedButtons from './GeneratedButtons';

import { GeneratedCard } from '@shared/api/openaiService';
import { Text } from '@shared/components/ui/ThemedText';
import CardCheckbox from '@shared/components/CardCheckbox';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { UpdateCardDto } from '@shared/api/deckService';
import { useFormStore } from '@shared/store/useGenerateFormStore';

type CreatedCardFormValues = {
  checkboxes: boolean[];
  deckId: number;
};

interface CreatedCardsProps {
  cards: GeneratedCard['cards'];
  onGenerate: () => void;
}

function CreatedCards({ cards, onGenerate }: CreatedCardsProps) {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { control, handleSubmit } = useForm<CreatedCardFormValues>({
    defaultValues: {
      deckId: Number(deckId),
      checkboxes: Array(cards.length).fill(true),
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

  console.log('w', usedPhrases);

  useEffect(() => {
    const frontCards = cards.map((card) => card.front);
    addPhrases(frontCards);
  }, [cards, addPhrases]);

  console.log(cards);

  const onSubmit = async (data: CreatedCardFormValues) => {
    const selectedCards = cards.filter((_, index) => data.checkboxes[index]);
    await sendData(data.deckId, selectedCards);
    router.dismiss(2);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <GeneratedButtons onGenerate={onGenerate} />
        <FlatList
          data={cards}
          contentContainerStyle={styles.listContent}
          renderItem={({ item: card, index }) => (
            <CardCheckbox index={index} card={card} control={control} />
          )}
        />
        {/* <View>
        {cards.map((card, index) => {
          return (
            <CardCheckbox
              key={index}
              index={index}
              card={card}
              control={control}
            />
          );
        })}
      </View> */}
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 12,
  },
  buttonContent: {
    padding: 0,
  },
  listContent: {
    paddingBottom: 60,
    paddingHorizontal: 12,
  },
});
