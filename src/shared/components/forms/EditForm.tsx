import React from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useLocalSearchParams } from 'expo-router';

import KeyboardAvoidingContainer from '../KeyboardAvoidingContainer';
import { ThemedView } from '../ui/ThemedView';
import ThemedButton from '../ui/ThemedButton';
import { Text } from '../ui/ThemedText';
import ThemedIconButton from '../ui/ThemedIconButton';
import LoadingIndicator from '../ui/LoadingIndicator';

import FormInput from './FormInput';

import {
  CREATE_CATEGORY_ICON_SIZE,
  KEYBOARD_OFFSET_IOS,
} from '@features/categories/constants';
import { StateFromFunctionReturningPromise } from '@shared/hooks/useAsyncFn';

type EditFormProps = {
  onSubmit: (data: TData) => Promise<void> | void;
  state: StateFromFunctionReturningPromise<
    (data: { name: string }) => Promise<void>
  >;
};

const EditForm = ({ onSubmit, state }: EditFormProps) => {
  const { name } = useLocalSearchParams<{ name: string }>();

  console.log('EditForm', name);

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: name || '',
    },
  });

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
          <Text>Done</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconCreate: {
    bottom: 20,
    height: CREATE_CATEGORY_ICON_SIZE,
    margin: 0,
    position: 'absolute',
    right: 10,
    width: CREATE_CATEGORY_ICON_SIZE,
  },
});

export default EditForm;
