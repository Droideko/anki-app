import React from 'react';
import { Slot, Stack, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';

import { useThemeColor } from '@shared/hooks/useThemeColor';
import { CardFormValues } from '@features/decks/components/DeckCardsContainer';

export default function CardLayout() {
  const { text, secondaryBackground } = useThemeColor();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();

  const methods = useForm<CardFormValues>({
    defaultValues: { deckId: Number(deckId), cards: [] },
  });

  return (
    <FormProvider {...methods}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: secondaryBackground },
          headerTintColor: text,
          headerBackTitle: '',
          // headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="generate"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Generate',
          }}
        />
        <Stack.Screen
          name="language"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Select Language',
          }}
        />
        <Stack.Screen
          name="[cardId]/add-example"
          options={{
            headerShown: true,
            headerTitle: 'Examples',
          }}
        />
        <Slot />
      </Stack>
    </FormProvider>
  );
}
