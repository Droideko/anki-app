import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { HeaderBackButton } from '@react-navigation/elements';
import { customAlphabet } from 'nanoid/non-secure';

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
import useFetchDeckCards from '@shared/hooks/useFetchDeckCards';
import buildPayload from '@features/decks/utils/buildPayloadCards';
import usePreventRemoveCards from '@features/decks/hooks/usePreventRemoveCards';
import { useCardsRepository } from '@features/decks/hooks/useCardsRepository';
import getFilteredCard from '@features/decks/utils/getFilteredCard';
import GenerateButton from '@features/decks/components/GenerateButton';
import { useDetectSoundStore } from '@shared/store/useDetectSoundStore';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export default function CreateDeckPage() {
  const { deckId, action } = useLocalSearchParams<{
    deckId: string;
    action?: 'add' | 'edit';
  }>();

  const { cards, loading } = useFetchDeckCards(Number(deckId));

  const { updateCards } = useCardsRepository();
  const { setCheck } = useDetectSoundStore();

  const setUnsavedChanges = usePreventRemoveCards();

  // const methods = useFormContext();
  // console.log('methods', methods);

  const { control, handleSubmit, reset, setValue } =
    useFormContext<CardFormValues>();

  // const { control, handleSubmit } = useForm<CardFormValues>({
  //   defaultValues: {
  //     deckId: Number(deckId),
  //     cards: cards.map((card) => ({ ...card, cardId: card.id })),
  //   },
  // });

  useEffect(() => {
    if (!loading) {
      reset({
        deckId: Number(deckId),
        cards: cards.map((card) => ({ ...card, cardId: card.id })),
      });
    }
  }, [loading, cards, deckId, reset]);

  const { fields, append, remove } = useFieldArray({ control, name: 'cards' });

  // useEffect(() => {
  //   if (action === 'add') append({ front: '', back: '', cardId: nanoid() });
  // }, [append, action]);

  useEffect(() => {
    if (action === 'add' && !loading) {
      append({ front: '', back: '', cardId: nanoid() });
    }
  }, [action, loading, append]);

  const onSubmit = async (formData: CardFormValues) => {
    try {
      const filteredCard = getFilteredCard(formData.cards);
      const payload = buildPayload(cards, filteredCard);

      await updateCards(formData.deckId, { cards: payload });
      setUnsavedChanges(false);

      setCheck(true);
      setTimeout(router.back);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update deck cards');
    }
  };

  const handleAddExample = (cardId: number | string) => {
    router.push(`/deck/${deckId}/card/${cardId}/add-example`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => <GenerateButton deckId={deckId} />,
          headerBackTitle: '',
          headerLeft: (props) => (
            <HeaderBackButton
              style={styles.button}
              {...props}
              onPress={() => router.back()}
            />
          ),
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
          <DeckCardsContainer
            fields={fields}
            control={control}
            onEdit={() => setUnsavedChanges(true)}
            onAddExample={handleAddExample}
            onAddCard={() => {
              setUnsavedChanges(true);
              append({ front: '', back: '', cardId: nanoid() });
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
  button: {
    marginLeft: -16,
  },
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
