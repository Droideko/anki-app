import React from 'react';
import { StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import { ThemedView } from '@shared/components/ui/ThemedView';
import SelectLanguage from '@shared/components/SelectLanguage';
import { useCategoryRepository } from '@features/categories/hooks/useCategoryRepository';
import { CountriesName } from '@shared/types/language';
import { speechLanguages } from '@shared/constants/language';

export default function Language() {
  const { updateDeck } = useCategoryRepository();
  const { deckId, type } = useLocalSearchParams<{
    deckId: string;
    type: 'front' | 'back';
  }>();

  const onSelect = async (language: CountriesName) => {
    const lang = type === 'front' ? 'frontLanguage' : 'backLanguage';
    const speechLanguage = speechLanguages[language];
    await updateDeck(Number(deckId), { [lang]: speechLanguage });
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingContainer>
        <SelectLanguage onSelect={onSelect} />
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
