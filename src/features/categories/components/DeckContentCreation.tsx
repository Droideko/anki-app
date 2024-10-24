import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';

import { CREATE_CATEGORY_ICON_SIZE } from '@features/categories/constants';
import ThemedButton from '@shared/components/ui/ThemedButton';
import FormInput from '@shared/components/forms/FormInput';
import { SNACKBAR_TYPE } from '@shared/constants/snackbar';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import useSnackbarStore from '@shared/store/useSnackbarStore';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
import { useDeckRepository } from '@shared/hooks/repository/useDeckRepository';
import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
import { Text } from '@shared/components/ui/ThemedText';
import { CreateDeckData } from '@shared/types/category';
import { DEFAULT_CREATE_DECK_VALUES } from '@shared/constants/deck';

function DeckContentCreation() {
  const { createDeck } = useDeckRepository();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { control, handleSubmit } = useForm<CreateDeckData>({
    defaultValues: DEFAULT_CREATE_DECK_VALUES,
  });

  const { showSnackbar } = useSnackbarStore();

  const [state, onSubmit] = useAsyncFn(async (data: CreateDeckData) => {
    const deck = await createDeck({
      ...data,
      categoryId: Number(id),
    });

    showSnackbar(
      `Deck '${deck.name}' has been successful created`,
      SNACKBAR_TYPE.SUCCESS,
    );

    router.replace({
      pathname: `/categories/${id}/decks/${deck.id}`,
      params: { name: deck.name },
    });
  }, []);

  return (
    <View style={styles.container}>
      <FormInput
        control={control}
        label="Deck name"
        name="name"
        placeholder="required"
        rules={{ required: 'Deck name is required' }}
        autoFocus={true}
      />
      <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
        <Text>Create</Text>
      </ThemedButton>
      <ThemedIconButton
        style={styles.iconCreate}
        onPress={handleSubmit(onSubmit)}
        size={CREATE_CATEGORY_ICON_SIZE}
        icon="check-circle"
      />
      {state.loading && <LoadingIndicator />}
      {state.error && <Text>{state.error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconCreate: {
    bottom: 0,
    height: CREATE_CATEGORY_ICON_SIZE,
    margin: 0,
    position: 'absolute',
    right: 0,
    width: CREATE_CATEGORY_ICON_SIZE,
  },
});

export default DeckContentCreation;
