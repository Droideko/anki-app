import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';

import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { SNACKBAR_TYPE } from '@shared/constants/snackbar';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import useSnackbarStore from '@shared/store/useSnackbarStore';
import EditForm from '@shared/components/forms/EditForm';

function DeckEditContainer() {
  const { deckId, name } = useLocalSearchParams<{
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
    if (!deckId || !name) {
      showSnackbar(
        'Error: Required data for editing is missing.',
        SNACKBAR_TYPE.ERROR,
      );
      router.back();
    }
  }, [deckId, name, showSnackbar]);

  if (!deckId || !name) {
    return null;
  }

  return <EditForm label="Deck name" state={state} onSubmit={onSubmit} />;
}

export default DeckEditContainer;
