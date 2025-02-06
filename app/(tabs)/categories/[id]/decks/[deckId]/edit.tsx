import React, { useEffect } from 'react';
import { Stack, useLocalSearchParams, router } from 'expo-router';

import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import useSnackbarStore from '@shared/store/useSnackbarStore';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import { SNACKBAR_TYPE } from '@shared/constants/snackbar';
import EditForm from '@shared/components/forms/EditForm';

const DeckEdit = () => {
  const { id, deckId, name } = useLocalSearchParams<{
    id: string;
    deckId: string;
    name: string;
  }>();

  const { updateDeck } = useCategoryRepository();
  const { showSnackbar } = useSnackbarStore();

  const [state, onSubmit] = useAsyncFn(async (data: { name: string }) => {
    if (!deckId) {
      throw new Error('id is undefined');
    }

    const deck = await updateDeck(Number(deckId), data);
    showSnackbar(
      `Deck '${deck.name}' has been successful edited`,
      SNACKBAR_TYPE.SUCCESS,
    );
    router.back();
  }, []);

  useEffect(() => {
    if (!id || !name) {
      showSnackbar(
        'Error: Required data for editing is missing.',
        SNACKBAR_TYPE.ERROR,
      );
      router.back();
    }
  }, [id, name, showSnackbar]);

  if (!id || !name) {
    return null;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: `Edit ${name}`,
          presentation: 'modal',
        }}
      />
      <EditForm state={state} onSubmit={onSubmit} />
    </>
  );
};

export default DeckEdit;
