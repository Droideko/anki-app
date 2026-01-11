import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { router, Stack } from 'expo-router';
import { useForm } from 'react-hook-form';

import { ThemedView } from '@shared/components/ui/ThemedView';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import { useReviewStore } from '@shared/store/useReviewStore';
import { useCardsStore } from '@shared/store/useCardsStore';
import { CardFormValue } from '@features/review/types';
import ReviewEditCard from '@features/review/components/ReviewEditForm';
import { useCardsRepository } from '@features/decks/hooks/useCardsRepository';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
import ReviewBackButton from '@features/review/components/ReviewBackButton';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';

export default function ReviewEdit() {
  const currentCardId = useReviewStore((state) => state.currentCardId);
  const cards = useCardsStore((state) => state.cardsById);
  const { updateCard } = useCardsRepository();
  const setChangedCard = useReviewStore((state) => state.setChangedCard);

  const { control, handleSubmit } = useForm<CardFormValue>({
    defaultValues: {
      card: (currentCardId && cards[Number(currentCardId)]) || {
        front: '',
        back: '',
      },
    },
  });

  const [{ loading }, onSubmit] = useAsyncFn(
    async (data: CardFormValue) => {
      try {
        const card = await updateCard(Number(currentCardId), data.card);
        if (currentCardId) {
          setChangedCard(currentCardId, card);
        }

        router.back();
        // setTimeout(router.back);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to edit card');
      }
    },
    [updateCard],
  );

  // const onSubmit = async (formData: CardFormValue) => {
  //   try {
  //     console.log(formData);
  //     await updateCard(Number(currentCardId), formData.card);

  //     router.back();
  //     // setTimeout(router.back);
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Failed to edit card');
  //   }
  // };

  if (!currentCardId) return null;

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: (props) => <ReviewBackButton {...props} />,
          headerTitle: 'Edit',
          headerRight: () => (
            <ThemedIconButton
              icon="check"
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
            />
          ),
        }}
      />

      <ThemedView style={styles.container}>
        <KeyboardAvoidingContainer>
          {loading ? (
            <View style={styles.loading}>
              <LoadingIndicator />
            </View>
          ) : (
            <>
              <ReviewEditCard control={control} autoFocus />
              <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
                <Text>Done</Text>
              </ThemedButton>
            </>
          )}
        </KeyboardAvoidingContainer>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
