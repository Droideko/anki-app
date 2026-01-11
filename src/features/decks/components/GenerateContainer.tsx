import React from 'react';
import { useForm } from 'react-hook-form';
import { SegmentedButtons } from 'react-native-paper';
import { View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import useGenerateSubmit from '../hooks/useGenerateSubmit';

import GenerateMoreOptions from './GenerateMoreOptions';
import CreatedCards from './CreatedCards';

import FormInput from '@shared/components/forms/FormInput';
import ThemedButton from '@shared/components/ui/ThemedButton';
import { Text } from '@shared/components/ui/ThemedText';
import { AccordionItem } from '@shared/components/Accordion/AccordionItem';
import { useFormStore } from '@shared/store/useGenerateFormStore';
import { TopicType } from '@shared/types/language';
import LoadingIndicator from '@shared/components/ui/LoadingIndicator';
import ScrollView from '@shared/components/ScrollView';
import LoadingSpinner from '@shared/components/ui/LoadingSpinner';

const SEGMENT_BUTTONS = {
  TOPIC: { value: 'topic', label: 'Topic' },
  WORD: { value: 'word', label: 'Word' },
} as const;

function isFieldKey(key: string): key is keyof typeof fieldConfigs {
  return key in fieldConfigs;
}

const fieldConfigs = {
  topic: {
    ...SEGMENT_BUTTONS.TOPIC,
    placeholder: 'Enter topic',
    errorMessage: 'This field is required',
  },
  word: {
    ...SEGMENT_BUTTONS.WORD,
    placeholder: 'Enter word',
    errorMessage: 'This field is required',
  },
} as const;

function GenerateContainer() {
  const { control, handleSubmit } = useForm<{ topic: string }>({
    defaultValues: {
      topic: '',
    },
  });

  const { type, updateForm } = useFormStore();

  const open = useSharedValue(false);

  const {
    state: { value, loading, error },
    onSubmit,
  } = useGenerateSubmit();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (value) {
    return <CreatedCards cards={value} onGenerate={handleSubmit(onSubmit)} />;
  }

  return (
    <ScrollView>
      <SegmentedButtons
        value={type}
        style={{ marginBottom: 16 }}
        onValueChange={(value) => updateForm({ type: value as TopicType })}
        buttons={[SEGMENT_BUTTONS.TOPIC, SEGMENT_BUTTONS.WORD]}
      />
      <FormInput
        name="topic"
        control={control}
        label={type === 'topic' ? 'Topic' : 'Word'}
        placeholder={type === 'topic' ? 'Enter topic' : 'Enter word'}
        rules={{ required: 'This field is required' }}
        autoFocus={true}
      />
      <AccordionItem title="More options" isExpanded={open}>
        <GenerateMoreOptions />
      </AccordionItem>
      <ThemedButton
        onPress={handleSubmit(onSubmit)}
        style={{ marginVertical: 8 }}
        mode="contained"
      >
        <Text>Generate</Text>
      </ThemedButton>
      {error && <Text>{error?.message}</Text>}
    </ScrollView>
  );
}

export default GenerateContainer;
