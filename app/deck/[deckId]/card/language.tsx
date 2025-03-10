import React from 'react';
import { StyleSheet } from 'react-native';

import KeyboardAvoidingContainer from '@shared/components/KeyboardAvoidingContainer';
import ScrollView from '@shared/components/ScrollView';
import LanguageContainer from '@features/decks/components/LanguageContainer';
import { ThemedView } from '@shared/components/ui/ThemedView';

export default function Language() {
  return (
    // <ScrollView>
    <ThemedView style={styles.container}>
      <KeyboardAvoidingContainer>
        <LanguageContainer />
      </KeyboardAvoidingContainer>
    </ThemedView>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
