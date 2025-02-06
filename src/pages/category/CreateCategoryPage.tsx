import React from 'react';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';

import FormInput from '@shared/components/forms/FormInput';
import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import ThemedIconButton from '@shared/components/ui/ThemedIconButton';
import { ThemedView } from '@shared/components/ui/ThemedView';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { useAsyncFn } from '@shared/hooks/useAsyncFn';
import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
import { Text } from '@shared/components/ui/ThemedText';
import useSnackbarStore from '@shared/store/useSnackbarStore';
import { SNACKBAR_TYPE } from '@shared/constants/snackbar';
import {
  CREATE_CATEGORY_ICON_SIZE,
  DEFAULT_CREATE_CATEGORY_VALUES,
  KEYBOARD_OFFSET_IOS,
} from '@features/categories/constants';
import { CreateCategoryData } from '@features/categories/types';

export default function CreateCategoryPage() {
  const { createCategory } = useCategoryRepository();

  const { control, handleSubmit } = useForm<CreateCategoryData>({
    defaultValues: DEFAULT_CREATE_CATEGORY_VALUES,
  });
  const { showSnackbar } = useSnackbarStore();

  const [state, onSubmit] = useAsyncFn(async (data: CreateCategoryData) => {
    const category = await createCategory(data);
    showSnackbar(
      `Category '${category.name}' has been successful created`,
      SNACKBAR_TYPE.SUCCESS,
    );
    router.back(); // TODO наверное надо делать редирект на созданную категорию или доску
  }, []);

  return (
    <KeyboardAvoidingContainer offsetIOS={KEYBOARD_OFFSET_IOS}>
      <ThemedView style={styles.container}>
        <FormInput
          control={control}
          label="Category name"
          name="name"
          placeholder="required"
          rules={{ required: 'Name is required' }}
          autoFocus={true}
        />
        <ThemedButton mode="contained" onPress={handleSubmit(onSubmit)}>
          <Text>Create</Text>
        </ThemedButton>
        <ThemedIconButton
          style={styles.iconCreate}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
          size={CREATE_CATEGORY_ICON_SIZE}
          icon="check-circle"
        />
        {state.loading && <LoadingIndicator />}
        {state.error && <Text>{state.error.message}</Text>}
      </ThemedView>
    </KeyboardAvoidingContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconCreate: {
    bottom: 0,
    position: 'absolute',
    right: 0,
  },
});
