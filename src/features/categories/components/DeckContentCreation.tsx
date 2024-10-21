import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { CREATE_CATEGORY_ICON_SIZE } from "@/src/features/categories/constants";
import ThemedButton from "@/src/shared/components/ui/ThemedButton";
import FormInput from "@/src/shared/components/forms/FormInput";
import { SNACKBAR_TYPE } from "@/src/shared/constants/snackbar";
import { useAsyncFn } from "@/src/shared/hooks/useAsyncFn";
import useSnackbarStore from "@/src/shared/store/useSnackbarStore";
import { useForm } from "react-hook-form";
import {
  CreateDeckData,
  DEFAULT_CREATE_DECK_VALUES,
} from "@/src/features/decks/constants";
import ThemedIconButton from "@/src/shared/components/ui/ThemedIconButton";
import { useDeckRepository } from "@/src/features/decks/hooks/useDeckRepository";
import LoadingIndicator from "@/src/shared/components/ui/LoadingIndicator";
import { Text } from "@/src/shared/components/ui/ThemedText";

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
      SNACKBAR_TYPE.SUCCESS
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
        rules={{ required: "Deck name is required" }}
        autoFocus={true}
      />
      <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
        Create
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
    position: "absolute",
    width: CREATE_CATEGORY_ICON_SIZE,
    height: CREATE_CATEGORY_ICON_SIZE,
    margin: 0,
    right: 0,
    bottom: 0,
  },
});

export default DeckContentCreation;
