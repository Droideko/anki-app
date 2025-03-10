import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import { Control, Controller } from 'react-hook-form';
import {
  Link,
  router,
  UnknownOutputParams,
  useLocalSearchParams,
} from 'expo-router';

import { countButtons, levelButtons } from '../constants';

import CardLanguageLink from './CardLanguageLink';
import ExampleSwitch from './ExampleSwitch';

import { Text } from '@shared/components/ui/ThemedText';
import { useFormStore } from '@shared/store/useGenerateFormStore';
import { CardCount, LanguageLevel } from '@shared/types/language';

export default function GenerateMoreOptions() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const {
    languageLevel,
    updateForm,
    count,
    example,
    frontLanguage,
    backLanguage,
  } = useFormStore();

  return (
    <View style={{ maxWidth: '100%' }}>
      <View style={styles.languageSelect}>
        <CardLanguageLink
          label="Front"
          href={`/deck/${deckId}/card/language?type=front`}
          language={frontLanguage}
        />
        <CardLanguageLink
          label="Back"
          href={`/deck/${deckId}/card/language?type=back`}
          language={backLanguage}
        />
      </View>
      <Text style={{ marginBottom: 8 }}>Language level</Text>
      <SegmentedButtons
        value={languageLevel}
        onValueChange={(value) =>
          updateForm({ languageLevel: value as LanguageLevel })
        }
        buttons={levelButtons}
        style={styles.segment}
      />
      <Text style={{ marginBottom: 8 }}>Cards count</Text>
      <SegmentedButtons
        value={String(count)}
        onValueChange={(newValue) =>
          updateForm({ count: Number(newValue) as CardCount })
        }
        buttons={countButtons}
        style={styles.segment}
      />
      <ExampleSwitch
        leftText="Add an example"
        value={example}
        onValueChange={(value) => updateForm({ example: value })}
        style={{ marginBottom: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  languageSelect: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  segment: {
    display: 'flex',
    marginBottom: 16,
    maxWidth: '100%',
  },
});
