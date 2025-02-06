import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useFieldArray, useForm } from 'react-hook-form';

// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import {
//   KeyboardAwareScrollView,
//   KeyboardToolbar,
// } from 'react-native-keyboard-controller';

import { ThemedView } from '@shared/components/ui/ThemedView';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
import DeckCardsContainer, {
  CardFormValues,
} from '@features/decks/components/DeckCardsContainer';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import useFetchDeckCards from '@features/decks/hooks/useFetchDeckCards';
import buildPayload from '@features/decks/utils/buildPayloadCards';
import usePreventRemoveCards from '@features/decks/hooks/usePreventRemoveCards';
import { useCardsRepository } from '@features/decks/hooks/useCardsRepository';
import getFilteredCard from '@features/decks/utils/getFilteredCard';

export default function CreateDeckPage() {
  const { deckId, action } = useLocalSearchParams<{
    deckId: string;
    action?: 'add' | 'edit';
  }>();

  const { cards } = useFetchDeckCards(Number(deckId));

  const { updateCards } = useCardsRepository();

  const setUnsavedChanges = usePreventRemoveCards();

  const { control, handleSubmit } = useForm<CardFormValues>({
    defaultValues: {
      deckId: Number(deckId),
      cards: cards.map((card) => ({ ...card, cardId: card.id })),
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'cards' });

  useEffect(() => {
    if (action === 'add') append({ front: '', back: '' });
  }, [append, action]);

  const onSubmit = async (formData: CardFormValues) => {
    try {
      const filteredCard = getFilteredCard(formData.cards);
      const payload = buildPayload(cards, filteredCard);

      await updateCards(formData.deckId, { cards: payload });
      setUnsavedChanges(false);

      setTimeout(() => {
        router.back();
      }, 0);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update deck cards');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          // headerBackButtonMenuEnabled: false,
          headerTitle: 'Create Card',
          headerRight: () => (
            <ThemedIconButton
              icon="check"
              onPress={() => {
                handleSubmit(onSubmit)();
              }}
            />
          ),
          gestureEnabled: false,
        }}
      />
      <ThemedView style={styles.container}>
        <KeyboardAvoidingContainer>
          <DeckCardsContainer
            fields={fields}
            control={control}
            onEdit={() => setUnsavedChanges(true)}
            onAddCard={() => {
              setUnsavedChanges(true);
              append({ front: '', back: '' });
            }}
            onRemoveCard={(index) => {
              setUnsavedChanges(true);
              remove(index);
            }}
          />
        </KeyboardAvoidingContainer>
        {/* <KeyboardAwareScrollView
        bottomOffset={70}
        contentContainerStyle={styles.scrollContent}
        style={{ flex: 1, marginBottom: 22 }}
        // extraScrollHeight={100}
      >
        <TextInput style={styles.input} placeholder="Введите текст..." />
      </KeyboardAwareScrollView>
      <KeyboardToolbar /> */}
        {/* <Animated.View style={[styles.menu, animatedMenuStyle]}>
          <Text>Меню, которое появляется над клавиатурой</Text>
        </Animated.View> */}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // input: {
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   height: 40,
  //   margin: 20,
  // },
  // menu: {
  //   backgroundColor: 'black',
  //   padding: 20,
  //   position: 'absolute',
  //   width: '100%',
  // },
  // scrollContent: {
  //   // flexGrow: 1,
  // },
});
