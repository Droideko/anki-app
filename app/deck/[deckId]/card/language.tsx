import React from 'react';
import { StyleSheet } from 'react-native';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import LanguageContainer from '@features/decks/components/LanguageContainer';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function Language() {
  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingContainer>
        <LanguageContainer />
      </KeyboardAvoidingContainer>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
