import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { useLocalSearchParams } from 'expo-router';

import KeyboardAvoidingContainer from '../KeyboardAvoidingContainer';
import { ThemedView } from '../ui/ThemedView';
import ThemedButton from '../ui/ThemedButton';
import { Text } from '../ui/ThemedText';
import ThemedIconButton from '../ui/ThemedIconButton';
import LoadingIndicator from '../ui/LoadingIndicator';

import FormInput from './FormInput';

import { StateFromFunctionReturningPromise } from '@shared/hooks/useAsyncFn';
import {
  CREATE_ICON_SIZE,
  KEYBOARD_OFFSET_IOS,
} from '@shared/constants/common';

type EditFormProps = {
  onSubmit: (data: TData) => Promise<void> | void;
  state: StateFromFunctionReturningPromise<
    (data: { name: string }) => Promise<void>
  >;
  label?: string;
};

const EditForm = ({
  onSubmit,
  state,
  label = 'Category name',
}: EditFormProps) => {
  const { name } = useLocalSearchParams<{ name: string }>();

  const { control, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: name || '',
    },
  });

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingContainer offsetIOS={KEYBOARD_OFFSET_IOS}>
        <View style={{ flex: 1 }}>
          <FormInput
            control={control}
            label={label}
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
            size={CREATE_ICON_SIZE}
            icon="check-circle"
          />
          {state.loading && <LoadingIndicator />}
          {state.error && <Text>{state.error.message}</Text>}
        </View>
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  iconCreate: {
    bottom: 20,
    height: CREATE_ICON_SIZE,
    margin: 0,
    position: 'absolute',
    right: 10,
    width: CREATE_ICON_SIZE,
  },
});

export default EditForm;
